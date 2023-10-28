import CONSTANTS from "./constants";
import { PullToSceneApplication } from "./pull-to-scene";

export class GoToOrPullHelpers {
  static getContextOptionPullToScene = (idField) => {
    return {
      name: `${CONSTANTS.MODULE_ID}.context-menu`,
      icon: '<i class="fas fa-directions"></i>',
      // condition: (_) => game.user?.isGM,
      condition: (li) => game.user.isGM && li[0].dataset.userId !== game.user.id,
      callback: (item) => {
        const scene = game.scenes?.get(item.data(idField));
        PullToSceneApplication.show(game.users, scene);
      },
    };
  };

  static getContextOptionGoToPlayer = (idField) => {
    return {
      name: `${CONSTANTS.MODULE_ID}.label.gotoplayer`,
      icon: '<i class="fas fa-street-view"></i>',
      //condition: (_) => game.user?.isGM,
      callback: (item) => {
        const userId = item.data("userId");
        const sceneId = game.users?.get(userId)?.viewedScene;
        const actorId = game.users?.get(userId)?.character?.id;
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
      },
    };
  };
}
