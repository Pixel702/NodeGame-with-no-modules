const fs = require("fs");

const ENTITIES_MAP = new Map();

const entityFiles = fs.readdirSync("./src/world/entities").filter(entity => entity.endsWith(".js"));
for (const entityFile of entityFiles) {
	const entity = require(`./entities/${entityFile}`);
	ENTITIES_MAP.set(entityFile.replace(/\.js/, "").toUpperCase(), entity);
};

module.exports = ENTITIES_MAP;