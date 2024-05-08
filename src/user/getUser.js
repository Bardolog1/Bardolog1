import OctokitTool from "../Octokit/OctokitTool";

const octokit = OctokitTool();

export async function getUser() {
    return octokit.users.getAuthenticated();
}