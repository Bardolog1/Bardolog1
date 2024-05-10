import { getStats } from "./src/getStats.js";
import { getUser } from "./src/user/getUser.js";


async function run() {
  const user = await getUser();
  await getStats(user);
}

run();
