const EntityTypes = require("./EntityTypes");
const BlockTypes = require("./BlockTypes");

class Render {
	constructor(game) {
		this.game = game;
		this.world = game.getWorld().getWorld();
	};

	getDisplay() {
		const rawText = [];

		for (const row of this.world) {
			const text = [];

			for (const tile of row) {
				if (!tile) text.push(" ");
				if (tile == null) continue;

				if (tile.ICON) {
					text.push(tile.ICON);
				};
			};

			rawText.push(text);
		};

		const output = [];

		for (const field of rawText) {
			output.push(field.join(""));
		};

		return output.join("\n");
	};
};

module.exports = Render;