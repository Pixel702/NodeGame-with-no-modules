const Mathf = require("../../modules/Mathf");
const BlockTypes = require("../BlockTypes");

const ITEM = {
    name: "Laser Eye",
    id: "laser_eye",
    damage: 20,

    action(player) {
        const game = player.getGame();
        const enemies = game.enemies;

        const randomEnemyIndex = Math.floor(Math.random() * enemies.length);

        player.damage = this.damage;

        if (!enemies[randomEnemyIndex]) return;

        const enemy = enemies[randomEnemyIndex];
        const world = game.getWorld();

        let move = true;

        const cords = Mathf.line(player.position, enemy.position);

        cords.pop();
		cords.shift();

        for (const cord of cords) {
			try {
				const tile = world.getTile(cord);

				if (tile.collide == true) {
					move = false;
				};
			} catch (e) {};
		};

        if (move) {
            world.fillLine(new (BlockTypes.get("LASER"))(), {
                position1: player.position,
                position2: enemy.position
            });
    
            enemy.onCollide(player);
        };
    }
};

module.exports = ITEM;