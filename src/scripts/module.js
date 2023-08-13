import CONSTANTS from "./constants.js";
import API from "./api.js";
import { getContextOption } from "./pull-to-scene.js";
import { registerSocket } from "./socket.js";
import { setApi } from "../module.js";

export const initHooks = () => {
  // warn("Init Hooks processing");
  // setup all the hooks
  Hooks.once("socketlib.ready", registerSocket);
  registerSocket();
};

export const setupHooks = () => {
  // warn("Setup Hooks processing");
  setApi(API);
};

export const readyHooks = async () => {
  Hooks.on("getSceneNavigationContext", (html, contextOptions) => {
    contextOptions.push(getContextOption("sceneId"));
  });

  Hooks.on("getSceneDirectoryEntryContext", (html, contextOptions) => {
    contextOptions.push(getContextOption("documentId"));
  });

  if (game.user?.isGM) {
    $(document).on("mouseup", ".player.flexrow", function (event) {
      if (event.which == 3) {
        const userId = event.currentTarget.dataset.userId;
        const sceneId = game.users?.get(userId)?.viewedScene;
        const actorId = game.users?.get(userId)?.character?.id;
        const $li = $(
          `<li class="context-item"><i class="fas fa-street-view"></i>${game.i18n.localize(
            `${CONSTANTS.MODULE_NAME}.label.gotoplayer`
          )}</li>`
        );
        $li.on("click", function () {
          if (sceneId) {
            if (sceneId != canvas.scene?.id) {
              game.scenes?.get(sceneId)?.view();
              Hooks.once("canvasReady", () => {
                const token = canvas.tokens?.placeables.find((t) => t.actor?.id === actorId);
                if (token) {
                  canvas.animatePan({ x: token.center.x, y: token.center.y, scale: 1 });
                }
              });
            } else {
              const token = canvas.tokens?.placeables.find((t) => t.actor?.id === actorId);
              if (token) {
                canvas.animatePan({ x: token.center.x, y: token.center.y, scale: 1 });
              }
            }
          }
        });
        setTimeout(() => {
          $(event.currentTarget).find(".context-items").append($li);
        }, 0);
      }
    });
  }
};
