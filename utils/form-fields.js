let fields = {
	intro: {
		email: '',
		1: '',
		2: '',
		3: '',
		4: '',
		5: '',
		6: '',
		7: '',
		8: '',
		9: '',
		10: '',
		11: ''
	},
	project_overview: {
		12: '',
		13: '',
		14: '',
		15: '',
		16: '',
		17: '',
		18: '',
		19: '',
		20: '',
		21: '',
		22: ''
	},
	users_community: {
		23: '',
		24: '',
		25: ''
	},
	product: {
		26: '',
		27: '',
		28: '',
		29: '',
		30: '',
		31: '',
		32: ''
	},
	team: {
		33: '',
		34: '',
		35: '',
		36: '',
		37: ''
	},
	token_economics: {
		38: '',
		39: '',
		40: '',
		41: ''
	},
	ico: {
		42: '',
		43: '',
		44: '',
		45: '',
		46: '',
		47: '',
		48: '',
		49: '',
		50: '',
		51: '',
		52: '',
		53: '',
		54: '',
		55: '',
		56: '',
		57: ''
	},
	wallet: {
		58: '',
		59: '',
		60: '',
		61: '',
		62: '',
		63: ''
	},
	miscellaneous: {
		64: '',
		65: '',
		66: '',
		67: '',
		68: '',
		69: '',
		70: ''
	},
	project_updates: {
		71: '',
		72: '',
		73: '',
		74: '',
		75: ''
	}
};

let getCategories = () => {
	return Object.keys(fields);
};

let isFieldEmpty = step => {
	const keys = Object.keys(fields[step]);
	let callout;
	for (let key of keys) {
		if (fields[step][key] === '') {
			callout = key;
			break;
		}
	}
	return callout;
};

export { fields, isFieldEmpty, getCategories };
