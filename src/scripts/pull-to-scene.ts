import CONSTANTS from "./constants";

export class PullToSceneApplication extends Application {
	users: User[];
	scene: Scene;
	thumb: string;
	selecteduserIds: string[];

	static async show(users, scene) {
		new PullToSceneApplication(users, scene).render(true);
	}

	constructor(users, scene, options = {}) {
		super(options);

		this.users = users.filter((user) => !user.isSelf && user.active);
		this.scene = scene;
		this.thumb = scene.data.thumb;
		this.selecteduserIds = [];
	}

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: `${CONSTANTS.MODULE_NAME}`,
			title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.pull-players-title`),
			template: `modules/${CONSTANTS.MODULE_NAME}/templates/pull-to-scene.html`,
			width: 300,
			popOut: true,
			classes: ["dialog"],
		});
	}

	getData() {
		return {
			users: this.users,
			thumb: this.thumb,
			sceneName: this.scene.name,
		};
	}

	async pullToScene() {
		for (const userId of this.selecteduserIds) {
			await game.socket?.emit("pullToScene", this.scene.id, userId);
		}

		this.close();
	}

	selectUser(userId, isSelected) {
		if (isSelected) {
			this.selecteduserIds.push(userId);
		} else {
			this.selecteduserIds = this.selecteduserIds.filter((currentUserId) => currentUserId !== userId);
		}
	}

	activateListeners(html) {
		super.activateListeners(html);

		const self = this;

		$(".dialog-button.pull", html).click($.proxy(this.pullToScene, this));

		$(".user-select", html).change(function () {
			//@ts-ignore
			self.selectUser(this.id, this.checked);
		});
	}
}

export const getContextOption = (idField) => {
	return {
		name: `${CONSTANTS.MODULE_NAME}.context-menu`,
		icon: '<i class="fas fa-directions"></i>',
		condition: (_) => game.user?.isGM,
		callback: (item) => {
			const scene = game.scenes?.get(item.data(idField));
			PullToSceneApplication.show(game.users, scene);
		},
	};
};
