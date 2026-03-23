import fs from "fs/promises";
import path from "path";

function parseArgs(argv) {
  const options = {
    summaryPath: "src/content/docs/tutorials/SUMMARY.md",
    section: "1projectmanage",
    mode: "dry-run",
    routePrefix: "/tutorials",
    id: "fab",
    outDir: "reports",
    target: "src/constants.ts",
  };

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [k, v] = arg.slice(2).split("=");
    if (!v) continue;

    switch (k) {
      case "summary":
        options.summaryPath = v;
        break;
      case "section":
        options.section = v;
        break;
      case "mode":
        options.mode = v;
        break;
      case "route-prefix":
        options.routePrefix = v;
        break;
      case "id":
        options.id = v;
        break;
      case "out-dir":
        options.outDir = v;
        break;
      case "target":
        options.target = v;
        break;
      default:
        break;
    }
  }

  return options;
}

function normalizeKey(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function ensureSlashPrefix(text) {
  return text.startsWith("/") ? text : `/${text}`;
}

function isExternalLink(link) {
  return /^https?:\/\//i.test(link);
}

function mapInternalLink(rawLink, routePrefix) {
  const defaultPrefix = ensureSlashPrefix(routePrefix).replace(/\/$/, "");

  let normalized = rawLink.trim().replace(/\\/g, "/");
  normalized = normalized.replace(/^\.\//, "");

  let prefix = defaultPrefix;
  if (/^doc\//i.test(normalized)) {
    normalized = normalized.replace(/^doc\//i, "");
    prefix = "/tutorials";
  } else if (/^class\//i.test(normalized)) {
    normalized = normalized.replace(/^class\//i, "");
    prefix = "/class";
  }

  normalized = normalized.replace(/\.mdx?$/i, "");
  normalized = normalized.toLowerCase();

  // Keep folder separators and normalize each path segment to URL-safe slug.
  normalized = normalized
    .split("/")
    .map((segment) => segment.replace(/[^a-z0-9-]/g, ""))
    .filter(Boolean)
    .join("/");

  return `${prefix}/${normalized}`.replace(/\/+/g, "/");
}

function parseMarkdownList(lines) {
  const entries = [];
  const listItemRegex = /^(\s*)\*\s+\[([^\]]+)\]\(([^)]*)\)(.*)$/;

  for (const line of lines) {
    const match = line.match(listItemRegex);
    if (!match) continue;

    const indent = match[1] || "";
    const label = match[2].trim();
    const link = match[3].trim();
    const trailing = (match[4] || "").trim();

    const depth = Math.floor(indent.length / 2) + 1;
    entries.push({ depth, label, link, trailing });
  }

  return entries;
}

function getSectionLinesByHeading(content, headingText) {
  const lines = content.split(/\r?\n/);
  const headingKey = normalizeKey(headingText);

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.+)$/);
    if (!m) continue;
    if (normalizeKey(m[1]) === headingKey) {
      start = i + 1;
      break;
    }
  }

  if (start === -1) return [];

  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }

  return lines.slice(start, end);
}

function findSection(entries, sectionKey) {
  const normalizedSection = normalizeKey(sectionKey);

  let startIndex = -1;
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    if (e.depth !== 1) continue;

    const labelKey = normalizeKey(e.label);
    const linkKey = normalizeKey(e.link);
    if (labelKey.includes(normalizedSection) || linkKey.includes(normalizedSection)) {
      startIndex = i;
      break;
    }
  }

  if (startIndex === -1) {
    return [];
  }

  const section = [entries[startIndex]];
  for (let i = startIndex + 1; i < entries.length; i++) {
    const e = entries[i];
    if (e.depth === 1) break;
    section.push(e);
  }

  return section;
}

function parseTopLevelNumber(label) {
  const m = String(label || "").trim().match(/^(\d+)\s*\./);
  return m ? Number(m[1]) : null;
}

function findNumberedSections(entries, minNo, maxNo) {
  const result = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.depth !== 1) continue;

    const no = parseTopLevelNumber(entry.label);
    if (no === null || no < minNo || no > maxNo) continue;

    result.push(entry);
    for (let j = i + 1; j < entries.length; j++) {
      const child = entries[j];
      if (child.depth === 1) break;
      result.push(child);
      i = j;
    }
  }

  return result;
}

function pickSectionEntries(entries, sectionArg) {
  const key = normalizeKey(sectionArg);
  if (key === "tutorials") {
    return findNumberedSections(entries, 1, 14);
  }
  if (key === "214") {
    return findNumberedSections(entries, 2, 14);
  }
  return findSection(entries, sectionArg);
}

function makeGroupItem(label, items, id) {
  const validItems = (items || []).filter(Boolean);
  if (!validItems.length) return null;
  return {
    label,
    labelEn: label,
    translations: { en: label },
    collapsed: true,
    items: validItems,
  };
}

function buildTree(flatEntries) {
  const roots = [];
  const stack = [];

  for (const entry of flatEntries) {
    const node = {
      label: entry.label,
      link: entry.link,
      depth: entry.depth,
      children: [],
    };

    while (stack.length && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    if (!stack.length) {
      roots.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return roots;
}

function toFabMenuItem(node, options) {
  const hasChildren = node.children.length > 0;
  const rawLink = node.link;
  const external = isExternalLink(rawLink);

  let link = "";
  if (external) {
    link = rawLink;
  } else if (rawLink) {
    link = mapInternalLink(rawLink, options.routePrefix);
  }

  const item = {
    label: node.label,
    labelEn: node.label,
    translations: { en: node.label },
  };

  if (!hasChildren) {
    item.attrs = { id: options.id };
  }

  if (link && !hasChildren) {
    item.link = link;
    item.linkEn = external ? rawLink : `/en${link}`;
  }

  if (hasChildren) {
    // Group nodes should not carry a link and default to collapsed.
    item.collapsed = true;
    item.items = node.children
      .map((child) => toFabMenuItem(child, options))
      .filter(Boolean);
  }

  // Drop invalid sidebar entries that have neither link nor children.
  if (!item.link && (!item.items || item.items.length === 0)) {
    return null;
  }

  return item;
}

function collectStats(flatEntries) {
  const total = flatEntries.length;
  const external = flatEntries.filter((e) => isExternalLink(e.link)).length;
  const internal = total - external;
  const maxDepth = flatEntries.reduce((acc, cur) => Math.max(acc, cur.depth), 0);

  return {
    totalItems: total,
    externalLinks: external,
    internalLinks: internal,
    maxDepth,
  };
}

function countTreeItems(nodes) {
  let n = 0;
  for (const node of nodes) {
    n += 1;
    if (node.items?.length) n += countTreeItems(node.items);
  }
  return n;
}

function makeGeneratedItemsBlock(generated, options) {
  const entries = generated
    .map((item) => {
      const text = JSON.stringify(item, null, 2)
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      return `${text},`;
    })
    .join("\n");

  return [
    "  // AUTO-GENERATED FROM SUMMARY START",
    `  // section=${options.section}; routePrefix=${options.routePrefix}; id=${options.id}`,
    entries,
    "  // AUTO-GENERATED FROM SUMMARY END",
  ]
    .filter(Boolean)
    .join("\n");
}

function updateFabMenuItemsArray(constantsContent, generatedBlock) {
  const fabArrayPattern = /const\s+FabMenuItems\s*=\s*\[([\s\S]*?)\];/;
  const match = constantsContent.match(fabArrayPattern);

  if (!match) {
    throw new Error("在 target 文件中未找到 const FabMenuItems = [...]");
  }

  let body = match[1];
  const generatedRegionPattern = /\s*\/\/ AUTO-GENERATED FROM SUMMARY START[\s\S]*?\/\/ AUTO-GENERATED FROM SUMMARY END\s*/;

  if (generatedRegionPattern.test(body)) {
    body = body.replace(generatedRegionPattern, `\n${generatedBlock}\n`);
  } else {
    const bodyTrimmed = body.trimEnd();
    let appended = bodyTrimmed;
    if (appended.length && !appended.endsWith(",")) {
      appended += ",";
    }
    body = `${appended}\n\n${generatedBlock}\n`;
  }

  return constantsContent.replace(fabArrayPattern, `const FabMenuItems = [${body}];`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!["dry-run", "apply"].includes(options.mode)) {
    throw new Error("mode 仅支持 dry-run 或 apply");
  }

  const summaryAbsPath = path.resolve(options.summaryPath);
  const text = await fs.readFile(summaryAbsPath, "utf8");

  const sectionKey = normalizeKey(options.section);
  let generated = [];
  let stats = { totalItems: 0, externalLinks: 0, internalLinks: 0, maxDepth: 0 };
  let parsedPreview = [];

  if (sectionKey === "tutorialsfabs") {
    const tutorialsLines = getSectionLinesByHeading(text, "Tutorials");
    const fabsLines = getSectionLinesByHeading(text, "FABS");

    const tutorialsEntriesAll = parseMarkdownList(tutorialsLines);
    const tutorialsEntries = findNumberedSections(tutorialsEntriesAll, 1, 14);
    const fabsEntries = parseMarkdownList(fabsLines);

    if (!tutorialsEntries.length) {
      throw new Error("未在 SUMMARY 的 Tutorials 下找到 1-14 目录项");
    }
    if (!fabsEntries.length) {
      throw new Error("未在 SUMMARY 的 FABS 下找到目录项");
    }

    const tutorialsTree = buildTree(tutorialsEntries);
    const fabsTree = buildTree(fabsEntries);

    const tutorialsItems = tutorialsTree
      .map((node) => toFabMenuItem(node, options))
      .filter(Boolean);
    const fabsItems = fabsTree
      .map((node) => toFabMenuItem(node, options))
      .filter(Boolean);

    generated = [
      makeGroupItem("Tutorials", tutorialsItems, options.id),
      makeGroupItem("FABS", fabsItems, options.id),
    ].filter(Boolean);

    const tutorialsStats = collectStats(tutorialsEntries);
    const fabsStats = collectStats(fabsEntries);
    stats = {
      totalItems: tutorialsStats.totalItems + fabsStats.totalItems,
      externalLinks: tutorialsStats.externalLinks + fabsStats.externalLinks,
      internalLinks: tutorialsStats.internalLinks + fabsStats.internalLinks,
      maxDepth: Math.max(tutorialsStats.maxDepth, fabsStats.maxDepth),
    };
    parsedPreview = [...tutorialsEntries.slice(0, 10), ...fabsEntries.slice(0, 10)];
  } else {
    const allEntries = parseMarkdownList(text.split(/\r?\n/));
    const sectionEntries = pickSectionEntries(allEntries, options.section);

    if (!sectionEntries.length) {
      throw new Error(`未在 SUMMARY 中找到 section: ${options.section}`);
    }

    const tree = buildTree(sectionEntries);
    generated = tree.map((node) => toFabMenuItem(node, options)).filter(Boolean);
    stats = collectStats(sectionEntries);
    parsedPreview = sectionEntries.slice(0, 20);
  }

  const now = new Date();
  const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  const outDir = path.resolve(options.outDir);
  await fs.mkdir(outDir, { recursive: true });
  const reportPath = path.join(outDir, `menu-gen-${ts}.json`);

  const report = {
    mode: options.mode,
    sourceFile: options.summaryPath,
    section: options.section,
    routePrefix: options.routePrefix,
    id: options.id,
    stats,
    generatedItemCount: countTreeItems(generated),
    parsedPreview,
    generated,
  };

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

  const tsPreview = `const GeneratedFabMenuItemsFromSummary = ${JSON.stringify(generated, null, 2)};`;
  const generatedBlock = makeGeneratedItemsBlock(generated, options);

  if (options.mode === "apply") {
    const targetAbsPath = path.resolve(options.target);
    const constantsContent = await fs.readFile(targetAbsPath, "utf8");
    const updated = updateFabMenuItemsArray(constantsContent, generatedBlock);
    await fs.writeFile(targetAbsPath, updated, "utf8");
    console.log("[apply] target:", options.target);
    console.log("[apply] status: updated FabMenuItems with generated section");
  }

  console.log("[summary] source:", options.summaryPath);
  console.log("[summary] section:", options.section);
  console.log("[summary] stats:", stats);
  console.log("[summary] report:", path.relative(process.cwd(), reportPath));
  console.log("\n=== TS PREVIEW START ===");
  console.log(tsPreview);
  console.log("=== TS PREVIEW END ===");
}

main().catch((err) => {
  console.error("[error]", err.message);
  process.exit(1);
});
