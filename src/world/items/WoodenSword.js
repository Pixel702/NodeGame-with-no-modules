const ITEM = {
    name: "Wooden Sword",
    id: "wooden_sword",
    damage: 4,

    action(player) {
        const index = player.selectedItem;
        player.damage = player.baseDamage + this.damage;
    }
};

module.exports = ITEM;