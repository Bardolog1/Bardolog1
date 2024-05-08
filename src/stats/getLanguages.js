import OctokitTool from "../Octokit/OctokitTool";

const octokit = OctokitTool();

export async function getLanguages(repo) {
  const languages = await octokit.request(
    "GET /repos/{owner}/{repo}/languages",
    {
      owner: "bardolog1",
      repo: repo.name,
    }
  );

  return languages.data;
}
