const TextColor = require("../../modules/TextColor.js");
const Mathf = require("../../modules/Mathf.js");

const EntityTypes = require("../EntityTypes");

let ICON = TextColor.BACKGROUND.BLUE(" ");
const DIRECTIONS = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

const Selectors = new Map();

function randomUnqiueUserIdentifier() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,

    function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    }).toUpperCase();
};

class Selector {
	constructor(id) {
		this.id = id;
		this.collide = false;
		Selectors.set(this.id, this);
		this.ICON = ICON;
	};

	getId() {
		return this.id
	};

	setGame(game) {
		this.game = game;
	};

	setPosition(world, options) {
		this.world = world;

		this.position = {
			x: options.x,
			y: options.y
		};

		Selectors.set(this.id, this);
	};

	move(direction) {
		if (this.dead) return;

		if (direction == DIRECTIONS.UP) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y - 1, x: this.position.x };

			if (this.position.y == 0) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return;

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Selectors.set(this.id, this);
		};

		if (direction == DIRECTIONS.DOWN) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y + 1, x: this.position.x };

			if (this.position.y == world.length - 1) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return;

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Selectors.set(this.id, this);
		};

		if (direction == DIRECTIONS.RIGHT) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y, x: this.position.x + 1 };

			if (this.position.x == world[0].length - 1) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return;

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			};
			
			Selectors.set(this.id, this);
		};

		if (direction == DIRECTIONS.LEFT) {
			if (this.hiddenTile) this.world.setTile(this.hiddenTile, this.hiddenTilePosition);

			const world = this.world.getWorld();
			const options = { y: this.position.y, x: this.position.x - 1 };

			if (this.position.x == 0) return;

			const tile = this.world.getTile(options);

			try {
				if (tile.collide) return;

				this.hiddenTile = tile;
				this.hiddenTilePosition = options;

				this.prevPosition = this.position;

				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Selector) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Selectors.set(this.id, this);
		};
	};
};

module.exports = Selector;
module.exports.all = Selectors;

module.exports.ICON = ICON;
module.exports.DIRECTIONS = DIRECTIONS;
module.exports.randomId = randomUnqiueUserIdentifier;