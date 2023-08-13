import { error } from "./lib/lib.js";

const API = {
  async pullPlayerToSceneArr(...inAttributes) {
    if (!Array.isArray(inAttributes)) {
      throw error("pullToSceneArr | inAttributes must be of type array");
    }
    const [sceneId, userId] = inAttributes;
    await this.pullToScene(sceneId, userId);
  },

  async pullPlayerToScene(sceneId, userId) {
    // Default socket
    await game.socket?.emit("pullToScene", sceneId, userId);
  },
};

export default API;
