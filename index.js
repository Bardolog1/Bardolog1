import { getUser } from "./src/user/getUser.js";


async function run() {

  //await getStats();
  console.log(await getUser());
}

run();
