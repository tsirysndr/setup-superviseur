import { tmpdir } from "node:os";
import * as action from "@actions/core";
import setup from "./setup";

if (!process.env.RUNNER_TEMP) {
  process.env.RUNNER_TEMP = tmpdir();
}

setup({
  version: action.getInput("superviseur-version"),
})
  .then(({ version, cacheHit }) => {
    action.setOutput("superviseur-version", version);
    action.setOutput("cache-hit", cacheHit);
  })
  .catch((error) => {
    action.setFailed(error.message);
  });
