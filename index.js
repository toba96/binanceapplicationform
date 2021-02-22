let page = 1;
let totalPages = 9;
let freshApplication = true;

let fields = {
	intro: {
		email: '',
		1: '',
		2: '',
		3: [],
		4: '',
		5: '',
		6: '',
		7: null,
		8: '',
		9: '',
		10: '',
		11: []
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
		if (fields[step][key] === '' || fields[step][key]?.length < 1 || fields[step][key] === null) {
			callout = key;
			break;
		}
	}
	return callout;
};

const categories = getCategories();

function getPage() {
	fetch(`sections/section-${page}.html`)
		.then(function (response) {
			return response.text();
		})
		.then(function (body) {
			document.getElementById('form').innerHTML = body;
		});
	window.scrollTo(0, 0);

	if (page === 10) {
		document.getElementById('next-button').style.display = 'none';
	} else {
		document.getElementById('next-button').style.display =
			page !== totalPages ? 'inline-block' : 'none';
	}

	document.getElementById('prev-button').style.display = page === 1 ? 'none' : 'inline-block';
	document.getElementById('submit-button').style.display =
		page === totalPages || page === totalPages + 1 ? 'inline-block' : 'none';
}

function moveToNextPage() {
	if (!freshApplication) {
		page = 10;
		document.getElementById('guage').style.width = '12rem';
		document.getElementById('guage-text').textContent = `${page} of 10`;
	} else {
		if (page < totalPages) page++;
		document.getElementById('guage').style.width = `${(page + 1) * 1.2}rem`;
		document.getElementById('guage-text').textContent = `${page + 1} of 10`;
	}
}

function moveToPreviousPage() {
	if (!freshApplication) {
		page = 1;
		document.getElementById('guage').style.width = '1.2rem';
		document.getElementById('guage-text').textContent = `${page} of 10`;
	} else {
		if (page > 1) page--;
		document.getElementById('guage').style.width = `${(page + 1) * 1.2}rem`;
		document.getElementById('guage-text').textContent =
			page === 1 ? '1 of 10' : `${page + 1} of 10`;
	}
}

function calloutError(callout) {
	let form_groups = document.getElementsByClassName('form-group');

	for (let form_group of form_groups) {
		form_group.style.borderColor = '#e7e8eb';
		if (form_group.lastElementChild.innerHTML === 'This is a required question') {
			form_group.removeChild(form_group.lastElementChild);
		}
	}

	let p = document.createElement('p');
	p.textContent = 'This is a required question';
	p.style.color = '#ff0000';
	document.getElementById(`field-${callout}`).appendChild(p);
	document.getElementById(`field-${callout}`).style.borderColor = '#ff0000';
	document.getElementById(`field-${callout}`).style.marginTop = '1rem';

	document.getElementById(`field-${callout}`).scrollIntoView({
		behavior: 'smooth'
	});
}

function loadhtml() {
	getPage();
}

function onNext() {
	const callout = isFieldEmpty(categories[page - 1]);
	if (!callout) {
		moveToNextPage();
		getPage();
	} else {
		calloutError(callout);
	}
}

function onPrevious() {
	moveToPreviousPage();

	getPage();
}

function onChange(name, value) {
	fields[categories[page - 1]][name] = value;
	document.getElementById(name).value = value;

	if (fields[categories[page - 1]]['9'] === 'Yes') {
		freshApplication = false;
	} else {
		freshApplication = true;
	}

	console.log(fields);
}

function onSelectOtherCheckbox(name, value) {
	const isOtherField = fields[categories[page - 1]][name].find(
		str => str !== 'CEO' && str !== 'Founder/Co-founder'
	);

	console.log(isOtherField);

	if (isOtherField) {
		fields[categories[page - 1]][name] = fields[categories[page - 1]][name].map(item => {
			if (item !== 'CEO' && item !== 'Founder/Co-founder') {
				item = value;
			}
			return item;
		});
	} else {
		fields[categories[page - 1]][name] = [...fields[categories[page - 1]][name], value];
	}

	console.log(fields);
}

function onSelectCheckbox(name, value) {
	const exists = fields[categories[page - 1]][name].find(str => str === value);

	if (exists) {
		fields[categories[page - 1]][name] = fields[categories[page - 1]][name].filter(
			str => str !== value
		);
	} else {
		fields[categories[page - 1]][name] = [...fields[categories[page - 1]][name], value];
	}

	console.log(fields);
}

function handleFile(input) {
	fields[categories[page - 1]][input.name] = input.files[0];

	document.getElementById(
		`filelist-${input.name}`
	).innerHTML = `<div>${input.files[0].name.substring(0, 15)}... <button onclick="removeFile(${
		input.name
	}, ${input.files[0].name})">x</button></div>`;
	console.log(fields);
}

function handleFiles(input) {
	fields[categories[page - 1]][input.name] = [
		...fields[categories[page - 1]][input.name],
		input.files[0]
	];

	document.getElementById(
		`filelist-${input.name}`
	).innerHTML = `<div>${input.files[0].name.substring(0, 15)}... <button onclick="removeFile(${
		input.name
	}, ${input.files[0].name})">x</button></div>`;

	console.log(fields);
}

function removeFile(name, fileName) {
	fields[categories[page - 1]][name] = fields[categories[page - 1]][name].filter(
		file => file.name !== fileName
	);
}

function saveAnswers() {
	const body = [];
	const list = {
		...fields.intro,
		...fields.project_overview,
		...fields.users_community,
		...fields.product,
		...fields.team,
		...fields.token_economics,
		...fields.ico,
		...fields.wallet,
		...fields.miscellaneous,
		...fields.project_updates,
		email: undefined,
		7: undefined,
		11: undefined,
		30: undefined,
		32: undefined,
		75: undefined
	};

	const keys = Object.keys(list);

	for (let key of keys) {
		body.push({ qid: key, answer: list[key] });
	}

	const inputFields = {
		email: fields.intro.email,
		body: body
	};

	console.log(inputFields);

	// const headers = new Headers();
	// headers.append(
	// 	'Authorization',
	// 	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYxMzgzNTI0MywiZXhwIjoxNzAwMjM1MjQzfQ.MzswXdL1p5cFl-uczUIUSGk4d4LErg78Lb7eFMnIT-o'
	// );

	fetch('http://node.devng.host/api/v1/answers', {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(inputFields)
	})
		.then(response => console.log(response))
		// .then(result => console.log(result))
		.catch(error => console.log(error));
}

function onSubmit() {
	const callout = isFieldEmpty(categories[page - 1]);
	if (!callout) {
		saveAnswers();
	} else {
		calloutError(callout);
	}
}
