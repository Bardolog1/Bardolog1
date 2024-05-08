import { getUser, getUserOwner } from "./src/user/getUser.js";


async function run() {

  //await getStats();
  console.log(await getUserOwner());
}

run();
