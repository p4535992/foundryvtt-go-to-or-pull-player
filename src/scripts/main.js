import CONSTANTS from "./constants.js";
import API from "./api.js";

import { registerSocket } from "./socket.js";
import { setApi } from "../module.js";
import { GoToOrPullHelpers } from "./helpers.js";

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
        contextOptions.push(GoToOrPullHelpers.getContextOptionPullToScene("sceneId"));
    });

    Hooks.on("getSceneDirectoryEntryContext", (html, contextOptions) => {
        contextOptions.push(GoToOrPullHelpers.getContextOptionPullToScene("documentId"));
    });

    Hooks.on("getUserContextOptions", (html, contextOptions) => {
        contextOptions.push(GoToOrPullHelpers.getContextOptionGoToPlayer("documentId"));
        contextOptions.push(GoToOrPullHelpers.getContextOptionWhereIsMyToken("documentId"));
    });
};
