import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types";

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        tags: data.tags || [],
        color: data.color || "#6c63ff",
        icon: data.icon || "🚀",
        link: data.link,
      } as Project;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
