import { Octokit } from "@octokit/rest";


export default function OctokitTool() {
    
    return new Octokit({
        auth: process.env.GH_TOKEN,
      });
}