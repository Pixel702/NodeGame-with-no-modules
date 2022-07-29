const readline = require("node:readline");
const FileHandler = require("../modules/FileHandler");
const TextColor = require("../modules/TextColor");
const Storage = require("../modules/Storage");
const EntityTypes = require("./EntityTypes");
const BlockTypes = require("./BlockTypes");
const ItemTypes = require("./ItemTypes");
const Render = require("./Render");

class Game {
	constructor() {
		this.enemies = [];
	};

	setWorld(world) {
		this._WORLD = world;
	};

	getWorld() {
		return this._WORLD;
	};

	spawnEnemy(id, options) {
		const enemy = new (EntityTypes.get("ENEMY"))(id, {
			EntityTypes,
			BlockTypes,
			ItemTypes
		});
		enemy.setGame(this);

		this._WORLD.setTile(enemy, options);
		this.enemies.push(enemy);

		return enemy;
	};

	spawnSelector(id, options) {
		const selector = new (EntityTypes.get("SELECTOR"))(id);
		selector.setGame(this);

		this._WORLD.setTile(selector, options);
		this.selector = selector;

		return selector;
	};

	spawnEnemyRandom(id) {
		const position = this._WORLD.getRandomPosition();
	    const tile = this._WORLD.getTile(position);

	    if (tile) return this.spawnPlayerRandom();

	    this.spawnEnemy(id, position);
	};

	spawnPlayer(id, options) {
		const player = new (EntityTypes.get("PLAYER"))(id);
		player.setGame(this);

		this._WORLD.setTile(player, options);
		this.player = player;
		
		return player;
	};

	spawnPlayerRandom(id) {
		const position = this._WORLD.getRandomPosition();
	    const tile = this._WORLD.getTile(position);

	    if (tile) return this.spawnPlayerRandom();

	    this.spawnPlayer(id, position);
	};

	getPlayer() {
		return this.player;
	};

	getEnemies() {
		return this.enemies;
	};

	updateWindow() {
		const renderer = new Render(this);

		console.clear();
		console.log(renderer.getDisplay());

		const player = this.getPlayer();

		const hotbar = this.MEM.Hotbar.get(player.id);

		console.log(`HEALTH: ${player.health}`);

		let text = "";
		
		for (let i = 0; i < hotbar.length; i++) {
			const item = hotbar[i];
			text += `${i == player.selectedItem ? TextColor.BACKGROUND.BLUE(item.name) : item.name} `
		};

		console.log(text);
	};

	async run() {
		let latestUpdate = "";

		const storage = Storage.get();

	    this.MEM = storage;

		const fileHandler = new FileHandler("./src/storage/player_data", storage);

		this.fileHandler = fileHandler;

		await fileHandler.load();
		await fileHandler.setup(this.player.id);

		for (const player of storage.Hotbar.keys()) {
			const data = [];
			const hotbar = storage.Hotbar.get(player);

			for (const item of hotbar) {
				if (!ItemTypes.has(item.id)) continue;

				const itm = ItemTypes.get(item.id);
				data.push(itm);
			};

			await storage.Hotbar.set(player, data);
		};

		for (const player of storage.Inventory.keys()) {
			const data = [];
			const inventory = storage.Inventory.get(player);

			for (const item of inventory) {
				if (!ItemTypes.has(item.id)) continue;

				const itm = ItemTypes.get(item.id);
				data.push(itm);
			};

			await storage.Inventory.set(player, data);
		};

		const rl = this.player.rl;

		rl.on("SIGINT", async () => {
			console.clear();
			console.log(TextColor.BACKGROUND.BLUE("   GOODBYE   "));

			await fileHandler.save();

			process.exit();
		});

		const world = this.getWorld();
		const game = this;
		const player = this.getPlayer();
		const enemies = this.enemies;

		setInterval(async function () {
			for (const enemy of enemies) {
				enemy.pathfinder();
			};
		}, 1000);

		setInterval(function() {
			const renderer = new Render(game);

			if (renderer.getDisplay() == latestUpdate) return;

			latestUpdate = renderer.getDisplay();

			console.clear();
			console.log(renderer.getDisplay());

			const hotbar = game.MEM.Hotbar.get(player.id);

			console.log(`HEALTH: ${player.health}`);

			let text = "";
			
			for (let i = 0; i < hotbar.length; i++) {
				const item = hotbar[i];
				text += `${i == player.selectedItem ? TextColor.BACKGROUND.BLUE(item.name) : item.name} `
			};

			console.log(text);
		}, 0);
	};
};

module.exports = Game;
