const World = require("../../world/World");
const TextColor = require("../../modules/TextColor");

class Level1 {
	constructor({ BlockTypes, EntityTypes, ItemTypes }) {
		this.BlockTypes = BlockTypes;
		this.EntityTypes = EntityTypes;
		this.ItemTypes = ItemTypes;

		const world = new World("level_1", {
		    x: 143,
		    y: 30
		});

		const wall = new (BlockTypes.get("WALL"))();
		const grass = new (BlockTypes.get("GRASS"))();

		world.setType(World.TYPES.NORMAL);
		world.createRoom(wall, {
			position1: {
				x: 0,
				y: 0
			},

			position2: {
				x: 10,
				y: 10
			},

			open: true,
			side: [
				World.SIDES.BOTTOM,
				World.SIDES.RIGHT
			]
		});
		world.createRoom(wall, {
			position1: {
				x: 10,
				y: 4
			},

			position2: {
				x: 20,
				y: 8
			},

			open: true,
			side: [
				World.SIDES.RIGHT,
				World.SIDES.LEFT
			]
		});
		world.createRoom(wall, {
			position1: {
				x: 20,
				y: 3
			},

			position2: {
				x: 40,
				y: 14
			}
		});
		world.removeTile({
			x: 20,
			y: 6
		});

		const items = [];

		for (const key of ItemTypes.keys()) {
			const item = ItemTypes.get(key);

			items.push(item);
		};

		world.setTile(new (BlockTypes.get("CHEST"))(items), {
			x: 30,
			y: 8
		});

		this.world = world;
	};

	setup(game) {
		this.game = game;

		game.setWorld(this.world);

		game.spawnEnemy((this.EntityTypes.get("ENEMY")).randomId(), {
			x: 30,
			y: 10,

			dep: {
				EntityTypes: this.EntityTypes,
				BlockTypes: this.BlockTypes,
				ItemTypes: this.ItemTypes
			}
		});

		game.spawnPlayer("Subie", {
		    x: 5,
		    y: 4
		});

		this.background();
	};

	background() {
		const enemies = this.game.enemies;

		if (!enemies.length) {
			console.clear();
			console.log(`${TextColor.BACKGROUND.GREEN("  YOU WON!  ")}`);
			process.exit();
		};
	};
};

module.exports = Level1;
