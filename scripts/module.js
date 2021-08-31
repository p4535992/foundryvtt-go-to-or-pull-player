Hooks.once("ready", () => {
    if(!game.user.isGM) return;
  $(document).on("mouseup", ".player.flexrow", function (event) {
    if (event.which == 3) {
      const userId = event.currentTarget.dataset.userId;
      const sceneId = game.users.get(userId).viewedScene;
      const actorId = game.users.get(userId).character?.id;
      const $li = $(
        `<li class="context-item"><i class="fas fa-street-view"></i>Go To Player</li>`
      );
      $li.on("click", function () {
        if (sceneId) {
            if(sceneId != canvas.scene.id){
                game.scenes.get(sceneId).view();
                Hooks.once("canvasReady", () => {
                  const token = canvas.tokens.placeables.find(t => t.actor?.id === actorId)
                  if (token) {
                      canvas.animatePan(({ x: token.center.x, y: token.center.y, scale: 1}));
                  }
                  
                });
            }else{
                const token = canvas.tokens.placeables.find(t => t.actor?.id === actorId)
                  if (token) {
                      canvas.animatePan(({ x: token.center.x, y: token.center.y, scale: 1}));
                  }
            }

        }
      });
      setTimeout(() => {
        $(event.currentTarget).find(".context-items").append($li);
      }, 0);
    }
  });
});
