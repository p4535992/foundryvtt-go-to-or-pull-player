import CONSTANTS from "./constants.js";
import { error } from "./lib/lib.js";
import { PullToSceneApplication } from "./pull-to-scene.js";
import { goToOrPullPlayerSocket } from "./socket.js";

const API = {
  async whereIsMyToken() {
    const options = game.scenes.reduce((acc, scene) => {
      const isOwner = scene.tokens.some((token) => token.testUserPermission(game.user, "OWNER"));
      if (!isOwner) {
        return acc;
      }
      return acc + `<option value="${scene.id}">${scene.name}</option>`;
    });
    const content = `
    <form>
      <div class="form-group">
        <label>Scene</label>
        <div class="form-fields">
          <select name="scene">${options}</select>
        </div>
      </div>
    </form>`;
    await Dialog.prompt({
      rejectClose: false,
      title: "Where are my tokens ?",
      label: "Change Scene",
      content,
      callback: async function (html, event) {
        const id = html[0].querySelector("[name=scene]").value;
        return game.scenes.get(id).view();
      },
    });
  },

  async pullPlayerToScene(sceneId, userId) {
    // NOTE: 'pullToScene' is a foundry default socket
    await game.socket?.emit("pullToScene", sceneId, userId);
  },

  // =============================================
  // SOCKET SUPPORT
  // ============================================

  async pullPlayerToSceneArr(...inAttributes) {
    if (!Array.isArray(inAttributes)) {
      throw error("pullToSceneArr | inAttributes must be of type array");
    }
    const [sceneId, userId] = inAttributes;
    // const user = game.users.get(userId);
    // const scene = game.scenes.get(sceneId);
    // const c = new PullToSceneApplication([user], scene);
    // await c.pullToScene();
    // NOTE: 'pullToScene' is a foundry default socket
    await game.socket?.emit("pullToScene", sceneId, userId);
  },
};

export default API;
