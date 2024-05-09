
import { promises as fs } from "fs";
import ReadmeTemplate from "../templates/ReadmeTemplate.js";

export async function updateReadme(updatedStats) {
  const readmePath = "../../README.md";

  await fs.writeFile(readmePath, ReadmeTemplate(updatedStats));
}
