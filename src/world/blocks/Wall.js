const TextColor = require("../../modules/TextColor");

const ICON = TextColor.BACKGROUND.YELLOW(" ");

class Wall {
	constructor() {
		this.collide = true;
		this.health = -1;
		this.ICON = ICON;
	};

	onCollision(action) {
		this.onCollide = action;
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

module.exports = Wall;
module.exports.ICON = ICON;