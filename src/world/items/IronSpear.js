const ITEM = {
    name: "Iron Spear",
    id: "iron_spear",
    damage: 4,

    dequip(player) {
        player.damage = player.baseDamage;
    },

    equip(player) {
        player.damage = player.baseDamage + this.damage;
    },

    action(player) {
        
    }
};

module.exports = ITEM;