
import { promises as fs } from "fs";
import ReadmeTemplate from "../templates/ReadmeTemplate.js";

export async function updateReadme(updatedStats) {
  const readmePath = "../../README.md";
  console.log("Updating README.md...");
  console.log(ReadmeTemplate(updatedStats));
  await fs.writeFile(readmePath, ReadmeTemplate(updatedStats));
}
