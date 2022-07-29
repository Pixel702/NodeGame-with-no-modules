const fs = require("fs");

class FileHandler {

	constructor(path, rawContainers) {
		this.path = path;

        const containersData = Object.keys(rawContainers);
        const containers = [];

        for (const container of containersData) {
            containers.push({
                name: container,
                map: rawContainers[container]
            });
        };

		this.containers = containers;
	};

	async setup(player) {
		const containers = this.containers;

		for (const container of containers) {
			if (container.map.has(player)) continue;

			container.map.set(player, container.map.get("default"));
		};
	}

	async save() {
		const containers = this.containers;
		const data = {};

		for (const container of containers) {
			const keys = container.map.keys();

			for (const key of keys) {
                if (key == "default") continue;
				data[key] = container.map.get(key);
			};

			const encoded = new TextEncoder().encode(JSON.stringify(data));

			await fs.writeFileSync(`${this.path}/${container.name}.bin`, encoded.join(" "));
		};
	};

	async load() {
		const containers = this.containers;

		for (const container of containers) {
			if (!fs.existsSync(`${this.path}/${container.name}.bin`)) continue;

			const data = JSON.parse(new TextDecoder().decode(Buffer.from((await fs.readFileSync(`${this.path}/${container.name}.bin`, "utf-8")).split(" "))));

			for (const player of Object.keys(data)) {
				container.map.set(player, data[player]);
			};
		};
	};

};

module.exports = FileHandler;