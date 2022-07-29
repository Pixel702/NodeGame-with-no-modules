const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const EntityTypes = require("../EntityTypes");
const TextColor = require("../../modules/TextColor");

let ICON = TextColor.BACKGROUND.WHITE(" ");
const DIRECTIONS = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

const Players = new Map();

function randomUnqiueUserIdentifier() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,

    function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    }).toUpperCase();
};

class Player {
	constructor(id) {
		this.selectedItem = "false";
		this.frozen = false;
		this.id = id;
		this.collide = true;
		Players.set(this.id, this);
		this.ICON = ICON;
		const rl = readline.createInterface({ input, output, prompt: "Dungeons> " });
		this.rl = rl;
		this.health = 200;
		this.baseDamage = 1;
		this.damage = this.baseDamage;
		this.casting = false;
		this.action();
	};

	onCollide(enemy) {
		if (!enemy instanceof EntityTypes.get("ENEMY")) return;

		const damage = enemy.damage;

		this.health -= damage;

		this.game.updateWindow();

		if (this.health <= 0) {
			console.clear();
			console.log(TextColor.BACKGROUND.RED("   YOU DIED   "));
			process.exit();
		};
	};

	getId() {
		return this.id;
	};

	action() {
		process.stdin.on("keypress", async (c, k) => {
			if (this.frozen) return;
			
			const move = k.name;

			let direction = 10;

			if (this.invOpen) {
				const inventory = this.game.MEM.Inventory.get(this.id);
				const hotbar = this.game.MEM.Hotbar.get(this.id);

				if (move == "escape" || move == "e") {
					this.selectedInvItem = "false";
					this.invOpen = false;
					this.game.updateWindow();

					return;
				};

				if (move == "up") {
					if (!inventory.length) return this.selectedInvItem = "false";

					if (this.selectedInvItem == "false") {
						this.selectedInvItem = 0;
					} else {
						if (this.selectedInvItem == 0) {
							this.selectedInvItem = inventory.length - 1;
						} else {
							this.selectedInvItem -= 1;
						};
					};
				};

				if (move == "down") {
					if (!inventory.length) return this.selectedInvItem = "false";

					if (this.selectedInvItem == "false") {
						this.selectedInvItem = 0;
					} else {
						if (this.selectedInvItem == inventory.length - 1) {
							this.selectedInvItem = 0;
						} else {
							this.selectedInvItem += 1;
						};
					};
				};

				if (move == "b") {
					if (this.selectedInvItem == "false") return;
					if (hotbar.length == 10) return;

					hotbar.push(inventory[this.selectedInvItem]);
					inventory.splice(this.selectedInvItem, 1);

					await this.game.MEM.Inventory.set(this.id, inventory);
					await this.game.MEM.Hotbar.set(this.id, hotbar);

					this.selectedInvItem = "false";

					console.clear();
					console.log(`${TextColor.BACKGROUND.BLUE("                BACKPACK                \n")}`);

					let text = "";

					for (let i = 0; i < inventory.length; i++) {
						const item = inventory[i];
						text += `${this.selectedInvItem == i ? TextColor.BACKGROUND.BLUE(item.name) : item.name}\n`;
					};

					return console.log(text);
				};

				console.clear();
				console.log(`${TextColor.BACKGROUND.BLUE("                BACKPACK                \n")}`);

				let text = "";

				for (let i = 0; i < inventory.length; i++) {
					const item = inventory[i];
					text += `${this.selectedInvItem == i ? TextColor.BACKGROUND.BLUE(item.name) : item.name}\n`;
				};

				return console.log(text);
			};

			if (!isNaN(move)) {
				const index = parseInt(move);
				const hotbar = this.game.MEM.Hotbar.get(this.id);

				if (!hotbar.length) return this.selectedItem = "false";
				if (!hotbar[index]) return;

				if (this.selectedItem == "false") {
					this.selectedItem = index;
					hotbar[index].equip ? hotbar[index].equip(this) : "";
				} else if (this.selectedItem == index) {
					hotbar[index].unequip ? hotbar[index].unequip(this) : "";
					this.selectedItem = "false";
				} else {
					this.selectedItem = index;
					hotbar[index].onHold ? hotbar[index].onHold(this) : "";
				};

				this.game.updateWindow();
			};

			if (move == "space") {
				const hotbar = this.game.MEM.Hotbar.get(this.id);

				if (this.selectedItem == "false") return;

				hotbar[this.selectedItem].action ? hotbar[this.selectedItem].action(this) : "";
			};

			if (move == "w") direction = 0;
			if (move == "s") direction = 1;
			if (move == "a") direction = 2;
			if (move == "d") direction = 3;

			if (move == "up") direction = 0;
			if (move == "down") direction = 1;
			if (move == "left") direction = 2;
			if (move == "right") direction = 3;

			if (move == "b") {
				if (this.selectedItem == "false") return;

				const index = this.selectedItem;
				const inventory = this.game.MEM.Inventory.get(this.id);
				const hotbar = this.game.MEM.Hotbar.get(this.id);

				inventory.push(hotbar[index]);
				hotbar.splice(index, 1);

				this.game.MEM.Hotbar.set(this.id, hotbar);
				this.game.MEM.Inventory.set(this.id, inventory);

				this.selectedItem = "false";

				this.game.updateWindow();
			};

			if (move == "v") return console.log(this.damage);

			if (move == "e") {
				this.invOpen = true;
				this.selectedInvItem = "false";

				console.clear();

				const items = this.game.MEM.Inventory.get(this.id);

				console.log(`${TextColor.BACKGROUND.BLUE("                BACKPACK                \n")}`);

				let text = "";

				for (const item of items) {
					text += `${item.name}\n`;
				};

				console.log(text);
			};

			this.move(direction);
		});
	};

	setGame(game) {
		this.game = game;
	};

	getGame() {
		return this.game;
	};

	getWorld() {
		return this.world;
	};

	setPosition(world, options) {
		this.world = world;

		this.position = {
			x: options.x,
			y: options.y
		};

		Players.set(this.id, this);
	};

	move(direction) {
		if (this.frozen) return;
		
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
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Players.set(this.id, this);
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
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Players.set(this.id, this);
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
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			};
			
			Players.set(this.id, this);
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
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			} catch(e) {
				const prevPosition = this.position;

				this.world.setTile(this, options);
				if (this.world.getTile(prevPosition) instanceof Player) this.world.removeTile(prevPosition);

				this.position = options;
			};

			Players.set(this.id, this);
		};
	};
};

module.exports = Player;
module.exports.all = Players;

module.exports.ICON = ICON;
module.exports.DIRECTIONS = DIRECTIONS;
module.exports.randomId = randomUnqiueUserIdentifier;