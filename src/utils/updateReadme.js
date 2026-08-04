import { promises as fs } from "fs";
import ReadmeTemplate from "../templates/ReadmeTemplate.js";
import ReadmeTemplateES from "../templates/ReadmeTemplateES.js";

export async function updateReadme(updatedStats) {
  await fs.writeFile("./README.md", ReadmeTemplate(updatedStats));
  await fs.writeFile("./README_ES.md", ReadmeTemplateES(updatedStats));
}
