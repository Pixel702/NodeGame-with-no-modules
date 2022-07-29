const TextColor = require("../../modules/TextColor.js");
const Mathf = require("../../modules/Mathf.js");

let ICON = TextColor.BACKGROUND.RED(" ");
const DIRECTIONS = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

const Enemies = new Map();

function randomUnqiueUserIdentifier() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,

    function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    }).toUpperCase();
};

class Enemy {
	constructor(id, { EntityTypes, BlockTypes, ItemTypes }) {
		this.id = id;
		this.collide = true;
		Enemies.set(this.id, this);
		this.ICON = ICON;

		this.EntityTypes = EntityTypes;
		this.BlockTypes = BlockTypes;
		this.ItemTypes = ItemTypes;

		this.aiEnabled = false;
		this.damage = 3;
		this.health = 50;
		this.dead = false;
	};

	onCollide(player) {
		if (this.dead) return;
		if (!(player instanceof this.EntityTypes.get("PLAYER"))) return;

		const damage = player.damage;

		this.health -= damage;

		this.ICON = TextColor.BACKGROUND.MAGENTA(" ");

		if (this.health <= 0) {
			this.dead = true;
			this.world.removeTile(this.position);

			const index = this.game.enemies.indexOf(this);
			if (!this.game.enemies[index]) return;
			this.game.enemies.splice(index, 1);
		};
	};

	getId() {
		return this.id
	};

	setGame(game) {
		this.game = game;
	};

	pathfinder() {
		if (this.dead) return;

		this.ICON = TextColor.BACKGROUND.RED(" ");

		const position = this.position;
		const world = this.world;
		const game = this.game;
		const enemy = this;

		const player = game.getPlayer();
		const cords = Mathf.line(position, player.position);

		cords.pop();
		cords.shift();

		var move = true;

		for (const cord of cords) {
			try {
				const tile = world.getTile(cord);

				if (tile.collide == true) {
					move = false;
				};
			} catch (e) {};
		};

		if (move) {
			const x = player.position.x - position.x;
			const y = player.position.y - position.y

			if (x < 0) {
				enemy.move(DIRECTIONS.LEFT);
			};

			if (x > 0) {
				enemy.move(DIRECTIONS.RIGHT);
			};

			if (y < 0) {
				enemy.move(DIRECTIONS.UP);
			};

			if (y > 0) {
				enemy.move(DIRECTIONS.DOWN);
			};
		};
	};

	setPosition(world, options) {
		this.world = world;

		this.position = {
			x: options.x,
			y: options.y
		};

		Enemies.set(this.id, this);
	};

	move(direction) {
		if (this.dead) return;

		const EntityTypes = this.EntityTypes;

		if (direction == DIRECTIONS.UP) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y - 1, x: this.position.x };

			if (this.position.y == 0) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return tile.onCollide ? tile.onCollide(this) : "";

				tile.onCollide ? tile.onCollide(this) : "";

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Enemies.set(this.id, this);
		};

		if (direction == DIRECTIONS.DOWN) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y + 1, x: this.position.x };

			if (this.position.y == world.length - 1) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return tile.onCollide ? tile.onCollide(this) : "";

				tile.onCollide ? tile.onCollide(this) : "";

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Enemies.set(this.id, this);
		};

		if (direction == DIRECTIONS.RIGHT) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y, x: this.position.x + 1 };

			if (this.position.x == world[0].length - 1) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return tile.onCollide ? tile.onCollide(this) : "";

				tile.onCollide ? tile.onCollide(this) : "";

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			};
			
			Enemies.set(this.id, this);
		};

		if (direction == DIRECTIONS.LEFT) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y, x: this.position.x - 1 };

			if (this.position.x == 0) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return tile.onCollide ? tile.onCollide(this) : "";

				tile.onCollide ? tile.onCollide(this) : "";

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Enemy) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Enemies.set(this.id, this);
		};
	};
};

module.exports = Enemy;
module.exports.all = Enemies;

module.exports.ICON = ICON;
module.exports.DIRECTIONS = DIRECTIONS;
module.exports.randomId = randomUnqiueUserIdentifier;
