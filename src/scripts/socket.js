import CONSTANTS from "./constants.js";
import API from "./api.js";
import { debug } from "./lib/lib.js";
import { setSocket } from "../module.js";

export let goToOrPullPlayerSocket;

export function registerSocket() {
  debug("Registered goToOrPullPlayerSocket");
  if (goToOrPullPlayerSocket) {
    return goToOrPullPlayerSocket;
  }
  //@ts-ignore
  goToOrPullPlayerSocket = socketlib.registerModule(CONSTANTS.MODULE_ID);

  goToOrPullPlayerSocket.register("pullPlayerToScene", (...args) => API.pullPlayerToSceneArr(...args));

  setSocket(goToOrPullPlayerSocket);
  return goToOrPullPlayerSocket;
}
