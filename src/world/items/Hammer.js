const Mathf = require("../../modules/Mathf");
const BlockTypes = require("../BlockTypes");
const EntityTypes = require("../EntityTypes");

const ITEM = {
    name: "Hammer",
    id: "hammer",

    action(player) {
        if (player.casting) return;
        player.frozen = true;
        player.casting = true;

        const game = player.getGame();
        const world = game.getWorld();

        const selector = game.spawnSelector(player.id, {
            x: player.position.x,
            y: player.position.y
        });

        process.stdin.on("keypress", async (c, k) => {
            const move = k.name;

            let direction = 10;

            if (move == "w") direction = 0;
			if (move == "s") direction = 1;
			if (move == "a") direction = 2;
			if (move == "d") direction = 3;

			if (move == "up") direction = 0;
			if (move == "down") direction = 1;
			if (move == "left") direction = 2;
			if (move == "right") direction = 3;

            if (move == "c") {
                const tile = new (BlockTypes.get("TIMEDWALL"))();

                await world.removeTile(selector.position);
                await world.setTile(tile, selector.position);
                
                selector.dead = true;

                player.frozen = false;
                player.casting = false;

                return;
            };

            selector.move(direction);
            game.getWorld().setTile(player, player.position);
        });
    }
};

module.exports = ITEM;