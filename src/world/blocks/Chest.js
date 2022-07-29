const TextColor = require("../../modules/TextColor.js");

const ICON = TextColor.BACKGROUND.GREEN(" ");

const EntityTypes = require("../EntityTypes");

class Chest {
	constructor(contents) {
		this.collide = true;
        this.contents = contents;
        this.ICON = ICON;
        this.health = -1;
	};

	onCollision(action) {
		this.onCollide = action;
	};

	async onCollide(player) {
		if (!(player instanceof EntityTypes.get("PLAYER"))) return;

        this.game = player.getGame();

        const inventory = this.game.MEM.Inventory.get(player.id);
        
        for (const content of this.contents) {
            inventory.push(content);
        };

        this.game.MEM.Inventory.set(player.id, inventory);

        this.world.removeTile(this.position);

        await this.game.fileHandler.save();
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

module.exports = Chest;
module.exports.ICON = ICON;