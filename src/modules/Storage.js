const Inventory = new Map();
const Hotbar = new Map();

Inventory.set("default", []);
Hotbar.set("default", []);

function get() {
    return {
        Inventory,
        Hotbar
    };
};

module.exports.get = get;