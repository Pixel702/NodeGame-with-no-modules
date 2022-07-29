const fs = require("fs");

const LEVELS_MAP = new Map();

const levelFiles = fs.readdirSync("./src/storage/levels").filter(level => level.endsWith(".js"));
for (const levelFile of levelFiles) {
	const level = require(`./levels/${levelFile}`);
	LEVELS_MAP.set(levelFile.replace(/\.js/, "").replace("\_", "").toUpperCase(), level);
};

module.exports = LEVELS_MAP;