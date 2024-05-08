import OctokitTool from "../Octokit/OctokitTool";
import { getUser } from "./src/user/getUser";
const octokit = OctokitTool();



async function run() {
  //await getStats();
  console.log(await getUser());
}

run();
