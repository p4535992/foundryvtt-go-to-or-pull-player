import CONSTANTS from "./constants";
import { dialogWarning, i18n, warn } from "./lib/lib";

export const registerSettings = function (): void {
	// game.settings.registerMenu(CONSTANTS.MODULE_NAME, "resetAllSettings", {
	// 	name: `${CONSTANTS.MODULE_NAME}.setting.reset.name`,
	// 	hint: `${CONSTANTS.MODULE_NAME}.setting.reset.hint`,
	// 	icon: "fas fa-coins",
	// 	type: ResetSettingsDialog,
	// 	restricted: true,
	// });
	// =====================================================================
};

class ResetSettingsDialog extends FormApplication<FormApplicationOptions, object, any> {
	constructor(...args) {
		//@ts-ignore
		super(...args);
		//@ts-ignore
		return new Dialog({
			title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.title`),
			content:
				'<p style="margin-bottom:1rem;">' +
				game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.content`) +
				"</p>",
			buttons: {
				confirm: {
					icon: '<i class="fas fa-check"></i>',
					label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.confirm`),
					callback: async () => {
						for (let setting of game.settings.storage
							.get("world")
							.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_NAME}.`))) {
							console.log(`Reset setting '${setting.key}'`);
							await setting.delete();
						}
						//window.location.reload();
					},
				},
				cancel: {
					icon: '<i class="fas fa-times"></i>',
					label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.cancel`),
				},
			},
			default: "cancel",
		});
	}

	async _updateObject(event: Event, formData?: object): Promise<any> {
		// do nothing
	}
}
