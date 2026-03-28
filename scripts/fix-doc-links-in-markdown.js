import fs from "fs/promises";
import path from "path";

function parseArgs(argv) {
  const options = {
    root: "src/content/docs",
    mode: "dry-run",
    exclude: ["src/content/docs/tutorials/SUMMARY.md"],
  };

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [k, v] = arg.slice(2).split("=");
    if (!v) continue;

    switch (k) {
      case "root":
        options.root = v;
        break;
      case "mode":
        options.mode = v;
        break;
      case "exclude":
        options.exclude = v.split(",").map((item) => item.trim()).filter(Boolean);
        break;
      default:
        break;
    }
  }

  return options;
}

function toPosix(filePath) {
  return filePath.replace(/\\/g, "/");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (/\.mdx?$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function mapInternalLink(rawTarget) {
  let normalized = String(rawTarget || "").trim().replace(/\\/g, "/");
  normalized = normalized.replace(/^\.\//, "");

  let prefix = "";
  if (/^doc\//i.test(normalized)) {
    prefix = "/tutorials";
    normalized = normalized.replace(/^doc\//i, "");
  } else if (/^class\//i.test(normalized)) {
    prefix = "/class";
    normalized = normalized.replace(/^class\//i, "");
  } else {
    return null;
  }

  const hashIndex = normalized.indexOf("#");
  let hash = "";
  if (hashIndex !== -1) {
    hash = normalized.slice(hashIndex);
    normalized = normalized.slice(0, hashIndex);
  }

  normalized = normalized.replace(/\.mdx?$/i, "");
  normalized = normalized.toLowerCase();
  normalized = normalized
    .split("/")
    .map((segment) => segment.replace(/[^a-z0-9_-]/g, ""))
    .filter(Boolean)
    .join("/");

  if (!normalized) return null;
  return `${prefix}/${normalized}${hash}`.replace(/\/+/g, "/");
}

function replaceMarkdownLinks(content) {
  const linkRegex = /\]\(([^)]+)\)/g;
  let changed = 0;

  const next = content.replace(linkRegex, (full, target) => {
    const trimmed = String(target || "").trim();

    // Keep optional title section untouched when present: path "title"
    const titleMatch = trimmed.match(/^([^\s]+)(\s+"[^"]*")$/);
    const targetPath = titleMatch ? titleMatch[1] : trimmed;
    const suffix = titleMatch ? titleMatch[2] : "";

    const mapped = mapInternalLink(targetPath);
    if (!mapped) return full;

    changed += 1;
    return `](${mapped}${suffix})`;
  });

  return { content: next, changed };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const rootAbs = path.resolve(options.root);
  const allFiles = await walk(rootAbs);

  const excludeSet = new Set(
    options.exclude.map((item) => toPosix(path.resolve(item)).toLowerCase())
  );

  const files = allFiles.filter(
    (filePath) => !excludeSet.has(toPosix(path.resolve(filePath)).toLowerCase())
  );

  let filesChanged = 0;
  let linksChanged = 0;

  for (const filePath of files) {
    const original = await fs.readFile(filePath, "utf8");
    const { content, changed } = replaceMarkdownLinks(original);

    if (!changed) continue;

    filesChanged += 1;
    linksChanged += changed;

    if (options.mode === "apply") {
      await fs.writeFile(filePath, content, "utf8");
    }

    console.log(`${options.mode === "apply" ? "UPDATED" : "WOULD_UPDATE"} ${toPosix(path.relative(process.cwd(), filePath))} (${changed} links)`);
  }

  console.log(`SUMMARY filesChanged=${filesChanged} linksChanged=${linksChanged} mode=${options.mode}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
