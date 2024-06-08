import API from "./api";
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
                API.goToPlayer(userId);
            },
        };
    };

    static getContextOptionWhereIsMyToken = (idField) => {
        return {
            name: `${CONSTANTS.MODULE_ID}.label.whereismytoken`,
            icon: '<i class="fas fa-search-location"></i>',
            //condition: (_) => game.user?.isGM,
            callback: (item) => {
                const userId = item.data("userId");
                API.whereIsMyToken();
            },
        };
    };
}
