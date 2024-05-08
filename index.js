import { getUser } from "./src/user/getUser";


async function run() {

  //await getStats();
  console.log(await getUser());
}

run();
