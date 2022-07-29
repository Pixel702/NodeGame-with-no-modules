const Game = require("./src/world/Game");
const World = require("./src/world/World");

const BlockTypes = require("./src/world/BlockTypes");
const EntityTypes = require("./src/world/EntityTypes");
const ItemTypes = require("./src/world/ItemTypes");

const Levels = require("./src/storage/Levels");
const level1 = new (Levels.get("LEVEL1"))({ BlockTypes, EntityTypes, ItemTypes });

const game = new Game(level1);
level1.setup(game);

game.run();