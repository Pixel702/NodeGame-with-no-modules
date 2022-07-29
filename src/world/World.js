const Mathf = require("../modules/Mathf");
const BlockTypes = require("./BlockTypes");

const Worlds = new Map();

const SIDES = {
    TOP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

const TYPES = {
    NORMAL: 0,
    WATER: 1
};

class World {
    constructor(id, options) {
        this.id = id;
        this.options = options;

        const WORLD = [];

        const x = new Array(options.x);
        const y = new Array(options.y);

        for (const l1 of y) {
            const row = [];

            for (const l2 of x) {
                row.push(null);
            };

            WORLD.push(row);
        };

        this._WORLD = WORLD;

        Worlds.set(id, this);
    };

    fillLine(tile, options) {
        const cords = Mathf.line(options.position1, options.position2);

        for (const cord of cords) {
            if (this.getTile(cord) != null) continue;

            this.setTile(tile, cord);
        };
    };

    getWorld() {
        return this._WORLD;
    };

    setTile(tile, options) {
        this._WORLD[options.y][options.x] = tile;
        
        tile.setPosition(this, options);
        Worlds.set(this.id, this);

        return tile;
    };

    removeTile(options) {
        this._WORLD[options.y][options.x] = null;
        Worlds.set(this.id, this);
    };

    getRandomPosition() {
        const randomRow = Math.floor(Math.random() * this._WORLD.length);
        const randomTile = Math.floor(Math.random() * this._WORLD[randomRow].length);

        return {
            x: randomTile,
            y: randomRow
        };
    };

    getTile(options) {
        return this._WORLD[options.y][options.x];
    };

    setType(type) {
        this.type = type;

        if (type == TYPES.NORMAL) return;

        if (type == TYPES.WATER) {
            for (const rows of this._WORLD) {
                for (const tile of rows) {
                    if (!tile) {
                        this.setTile(new (BlockTypes.get("WATER")()), {
                            x: rows.indexOf(tile),
                            y: this._WORLD.indexOf(rows)
                        });
                    };
                };
            };
        };
    };

    createRoom(tile, options) {
        this.fillLine(tile, {
            position1: {
                x: options.position1.x,
                y: options.position1.y
            },

            position2: {
                x: options.position2.x,
                y: options.position1.y
            }
        });

        this.fillLine(tile, {
            position1: {
                x: options.position2.x,
                y: options.position2.y
            },

            position2: {
                x: options.position1.x,
                y: options.position2.y
            }
        });

        this.fillLine(tile, {
            position1: {
                x: options.position1.x,
                y: options.position1.y
            },

            position2: {
                x: options.position1.x,
                y: options.position2.y
            }
        });

        this.fillLine(tile, {
            position1: {
                x: options.position2.x,
                y: options.position2.y
            },

            position2: {
                x: options.position2.x,
                y: options.position1.y
            }
        });

        if (options.open) {
            const sides = options.side;

            for (const side of sides) {
                if (side == SIDES.TOP) {
                    const x = Math.floor((options.position2.x + options.position1.x) / 2);
                    const y = options.position1.y;

                    this.removeTile({x, y});
                };

                if (side == SIDES.BOTTOM) {
                    const x = Math.floor((options.position2.x + options.position1.x) / 2);
                    const y = options.position2.y;

                    this.removeTile({x, y});
                };

                if (side == SIDES.LEFT) {
                    const x = options.position1.x;
                    const y = Math.floor((options.position2.y + options.position1.y) / 2);

                    this.removeTile({x, y});
                };

                if (side == SIDES.RIGHT) {
                    const x = options.position2.x;
                    const y = Math.floor((options.position2.y + options.position1.y) / 2);

                    this.removeTile({x, y});
                };
            };
        };
    };

    setWalls(tile) {
        for (let i = 0; i < this.options.x.length; i++) {
            this.setTile(tile, {
                y: 0,
                x: i
            });

            this.setTile(tile, {
                y: this.options.y.length - 1,
                x: i
            });
        };

        for (let i = 0; i < this.options.y.length; i++) {
            this.setTile(tile, {
                y: i,
                x: 0
            });

            this.setTile(tile, {
                y: i,
                x: this.options.x.length - 1
            });
        };
    };
};

module.exports = World;
module.exports.all = Worlds;

module.exports.TYPES = TYPES;
module.exports.SIDES = SIDES;