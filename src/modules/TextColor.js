const prefix = "\u001B[";
const suffix = "\u001B[0m";

const BACKGROUND = {
	BLACK(string) {
		let color = "40";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	RED(string) {
		let color = "41";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	GREEN(string) {
		let color = "42";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	YELLOW(string) {
		let color = "43";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	BLUE(string) {
		let color = "44";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	MAGENTA(string) {
		let color = "45";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	CYAN(string) {
		let color = "46";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	WHITE(string) {
		let color = "47";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	}
};

const COLOR = {
	BLACK(string) {
		let color = "30";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	RED(string) {
		let color = "31";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	GREEN(string) {
		let color = "32";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	YELLOW(string) {
		let color = "33";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	BLUE(string) {
		let color = "34";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	MAGENTA(string) {
		let color = "35";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	CYAN(string) {
		let color = "36";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	},

	WHITE(string) {
		let color = "37";
		let text = `${prefix};${color}m`
		text += string;
		text += suffix;

		return text;
	}
};

module.exports = {
	COLOR,
	BACKGROUND
}