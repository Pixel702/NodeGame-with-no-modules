const TextColor = require("../../modules/TextColor");
const Levels = require("../../storage/Levels");

const ICON = TextColor.BACKGROUND.MAGENTA(" ");

class Goal {
	constructor() {
		this.collide = true;

		this.EntityTypes = EntityTypes;
		this.BlockTypes = BlockTypes;
		this.health = -1;
		this.ICON = ICON;
	};

	onCollide(player) {
		this.game = player.getGame();

		const id = this.world.id.split("_");
		const levelNum = parseInt(id[1]);

		const level = Levels[`LEVEL${levelNum++}`]();

		console.log(level);

		this.game.setWorld(level);
		level.setup(this.game);
	};

	setPosition(world, options) {
		this.position = options;
		this.world = world;
	};

	damage(damage) {
		if (isNaN(damage)) return;
		if (this.health == -1) return;

		if (this.health <= 0) {
			this.world.removeTile(this.position);
			return;
		};

		this.health = this.health - damage;
	};
};

module.exports = Goal;
module.exports.ICON = ICON;