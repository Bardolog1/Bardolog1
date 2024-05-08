import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

export async function getUser() {
    return octokit.users.getAuthenticated();
}