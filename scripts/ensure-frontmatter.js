import fs from "fs/promises";
import path from "path";

const roots = [
  path.resolve("src/content/docs/tutorials"),
  path.resolve("src/content/docs/class"),
];

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      await walk(full);
    } else if (/\.mdx?$/.test(ent.name)) {
      if (ent.name.toLowerCase() === "summary.md") continue;
      const text = await fs.readFile(full, "utf8");
      const fmMatch = text.match(/^\s*---([\s\S]*?)---/);
      const titleRaw = path.basename(ent.name, path.extname(ent.name));
      const title = titleRaw
        .replace(/&/g, " and ")
        .replace(/[_.]/g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (m) => m.toUpperCase());

      let newText = text;
      if (!fmMatch) {
        const frontmatter = `---\ntitle: \"${title}\"\nsidebar:\n  attrs: { id: tutorial }\n---\n\n`;
        newText = frontmatter + text;
      } else {
        const fmBody = fmMatch[1];
        if (!/title\s*:/i.test(fmBody)) {
          const frontmatter = `---\ntitle: \"${title}\"\nsidebar:\n  attrs: { id: tutorial }\n---`;
          newText = text.replace(/^\s*---([\s\S]*?)---/, frontmatter);
        }
      }

      if (newText !== text) {
        await fs.writeFile(full, newText, "utf8");
        console.log("updated", full);
      }
    }
  }
};

Promise.all(roots.map((root) => walk(root)))
  .then(() => console.log("all done"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
