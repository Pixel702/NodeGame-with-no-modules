const fs = require("fs");

const BLOCKS_MAP = new Map();

const blockFiles = fs.readdirSync("./src/world/blocks").filter(block => block.endsWith(".js"));
for (const blockFile of blockFiles) {
	const block = require(`./blocks/${blockFile}`);
	BLOCKS_MAP.set(blockFile.replace(/\.js/, "").toUpperCase(), block);
};

module.exports = BLOCKS_MAP;