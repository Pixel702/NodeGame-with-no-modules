const fs = require("fs");

const ITEMS_MAP = new Map();

const itemFiles = fs.readdirSync("./src/world/items").filter(item => item.endsWith(".js"));
for (const itemFile of itemFiles) {
	const item = require(`./items/${itemFile}`);
	ITEMS_MAP.set(item.id, item);
};

module.exports = ITEMS_MAP;