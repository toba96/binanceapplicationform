let page = 1;
let totalPages = 9;
let freshApplication = true;

let email = '';
let fields = {
	intro: {
		1: '',
		2: '',
		3: [],
		4: '',
		5: '',
		6: '',
		8: '',
		9: '',
		10: ''
	},
	project_overview: {
		12: '',
		13: [],
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
		28: [],
		29: '',
		31: ''
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
		60: [],
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
		74: ''
	}
};

let fileFields = {
	intro: {
		7: null,
		11: []
	},
	product: {
		30: [],
		32: []
	},
	project_updates: {
		75: []
	}
};

const defaultFreshApplicationFields = () => ({
	project_overview: {
		12: '',
		13: [],
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
		28: [],
		29: '',
		31: ''
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
		60: [],
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
	}
});

const defaultExistingApplicationFields = () => ({
	project_updates: {
		71: '',
		72: '',
		73: '',
		74: ''
	}
});

const clearFreshApplicationFields = () => {
	const defaultFields = defaultFreshApplicationFields();
	fields = { ...fields, ...defaultFields };
	const keys = Object.keys(defaultFields);

	for (let key of keys) {
		const subKeys = Object.keys(defaultFields[key]);

		for (let subKey of subKeys) {
			document.getElementsByName(subKey)[0].value = fields[key][subKey];
			if (document.getElementsByName(subKey).length > 1) {
				for (children of document.getElementsByName(subKey)) {
					children.checked = false;
				}
			}
		}
	}
};

const clearExistingApplicationFields = () => {
	const defaultFields = defaultExistingApplicationFields();
	fields = { ...fields, ...defaultFields };
	const keys = Object.keys(defaultFields);

	for (let key of keys) {
		const subKeys = Object.keys(defaultFields[key]);

		for (let subKey of subKeys) {
			document.getElementsByName(subKey)[0].value = fields[key][subKey];
		}
	}
};

let getCategories = () => {
	return Object.keys(fields);
};

let isFieldEmpty = (step, fileCategory) => {
	const keys =
		step === 'fileFields' ? Object.keys(fileFields[fileCategory] || {}) : Object.keys(fields[step]);
	let callout;

	for (let key of keys) {
		if (step === 'fileFields') {
			if (fileFields[fileCategory][key] === null || fileFields[fileCategory][key]?.length < 1) {
				callout = key;
				break;
			}
		} else {
			if (fields[step][key] === '' || fields[step][key]?.length < 1) {
				callout = key;
				break;
			}
		}
	}

	return callout;
};

const categories = getCategories();

function getSection() {
	const children = document.getElementById('form').children;

	for (let i = 0; i < children.length; i++) {
		if (page === i + 1) {
			children[i].style.display = 'block';
		} else {
			children[i].style.display = 'none';
		}
	}

	document.getElementById('body').scrollIntoView({ behavior: 'smooth' });

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
		clearFreshApplicationFields();
		document.getElementById('guage').style.width = '12rem';
		document.getElementById('guage-text').textContent = `${page} of 10`;
	} else {
		if (page < totalPages) page++;
		clearExistingApplicationFields();
		document.getElementById('guage').style.width = `${(page + 1) * 1.2}rem`;
		document.getElementById('guage-text').textContent = `${page + 1} of 10`;
	}

	if (page > 1 && page < 5) {
		document.getElementById('guage').style.backgroundColor = '#4285f3';
	}
	if (page > 4 && page < 9) {
		document.getElementById('guage').style.backgroundColor = '#098591';
	}

	if (page === 9 || page === 10) {
		document.getElementById('guage').style.backgroundColor = '#3ea853';
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
		if (
			form_group.lastElementChild.innerHTML ===
				`<span class="warning"></span> This is a required question` ||
			form_group.lastElementChild.innerHTML === `<span class="warning"></span> Email is invalid`
		) {
			form_group.removeChild(form_group.lastElementChild);
		}
	}

	let p = document.createElement('p');
	p.innerHTML =
		callout === 'invalid email'
			? `<span class="warning"></span> Email is invalid`
			: `<span class="warning"></span> This is a required question`;
	p.style.display = 'flex';
	p.style.alignItems = 'flex-start';
	p.style.justifyContent = 'space-between';
	p.style.width = '20rem';
	p.style.color = '#ff0000';
	p.style.marginTop = '1.5rem';
	p.style.fontSize = '1.2rem';
	document
		.getElementById(`field-${callout === 'invalid email' ? 'email' : callout}`)
		.appendChild(p);
	document.getElementById(
		`field-${callout === 'invalid email' ? 'email' : callout}`
	).style.borderColor = '#ff0000';

	document
		.getElementById(`field-${callout === 'invalid email' ? 'email' : callout}`)
		.scrollIntoView({
			behavior: 'smooth'
		});
}

function loadhtml() {
	getSection();
}

function isEmailEmpty() {
	return email === '' ? 'email' : null;
}

function validateEmail() {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const isValid = re.test(String(email).toLowerCase());
	return isValid ? null : 'invalid email';
}

function onNext() {
	const callout =
		isEmailEmpty() ||
		validateEmail() ||
		isFieldEmpty(categories[page - 1], null) ||
		isFieldEmpty('fileFields', categories[page - 1]);
	if (!callout) {
		moveToNextPage();
		getSection();
	} else {
		calloutError(callout);
	}
}

function onPrevious() {
	moveToPreviousPage();

	getSection();
}

function onChange(name, value) {
	if (name === 'email') {
		email = value;
		fetch(`https://node.devng.host/api/v1/answers/email/${email}`, {
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYxMzgzNTI0MywiZXhwIjoxNzAwMjM1MjQzfQ.MzswXdL1p5cFl-uczUIUSGk4d4LErg78Lb7eFMnIT-o'
			}
		})
			.then(response => response.json())
			.then(result => {
				if (result.email === email) {
					alert(result.message);
					window.location.href = 'https://binance.sg';
				}
			});
	} else {
		fields[categories[page - 1]][name] = value;

		if (fields['intro']['9'] === 'Yes') {
			freshApplication = false;
		} else {
			freshApplication = true;
		}
	}
}

function onSelectOtherCheckbox(name, value) {
	if (document.getElementById(`others-${name}`).checked === true) {
		const inputValue = document.getElementById(name).value;
		const isOtherField = fields[categories[page - 1]][name].find(str => str === inputValue);

		if (isOtherField) {
			fields[categories[page - 1]][name] = fields[categories[page - 1]][name].map(item => {
				if (item === inputValue) {
					item = value;
				}
				return item;
			});
		} else {
			fields[categories[page - 1]][name] = [...fields[categories[page - 1]][name], value];
		}
	}
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
}

function handleCheckOthers(input) {
	const inputValue = document.getElementById(input.name).value;
	if (input.checked === false) {
		fields[categories[page - 1]][input.name] = fields[categories[page - 1]][input.name].filter(
			str => str !== inputValue
		);
	} else {
		if (inputValue !== '') {
			fields[categories[page - 1]][input.name] = [
				...fields[categories[page - 1]][input.name],
				inputValue
			];
		}
	}
}

function handleFile(input) {
	fileFields[categories[page - 1]][input.name] = input.files[0];

	document.getElementById(
		`filelist-${input.name}`
	).innerHTML = `<div class="file-item">${input.files[0].name.substring(
		0,
		15
	)}... <button class="remove-btn" onclick="removeFile(${input.name})">x</button></div>`;

	document.getElementById(input.name).style.display = 'none';
	document.getElementById(`file-input-${input.name}`).style.display = 'none';
}

function handleFiles(input) {
	fileFields[categories[page - 1]][input.name] = [
		...fileFields[categories[page - 1]][input.name],
		input.files[0]
	];

	const item = file =>
		`<div class="file-item">${file.name.substring(
			0,
			15
		)}... <button class="remove-btn" onclick="removeFiles(
			${input.name}, '${file.name}'
		)">x</button></div>`;

	document.getElementById(`filelist-${input.name}`).innerHTML = '';
	for (let file of fileFields[categories[page - 1]][input.name]) {
		document.getElementById(`filelist-${input.name}`).innerHTML += item(file);
	}
}

function removeFile(name) {
	fileFields[categories[page - 1]][name] = null;

	document.getElementById(name).style.display = 'block';
	document.getElementById(`file-input-${name}`).style.display = 'block';

	document.getElementById(`filelist-${name}`).innerHTML = '';
}

function removeFiles(name, fileName) {
	fileFields[categories[page - 1]][name] = fileFields[categories[page - 1]][name].filter(
		file => file.name !== fileName
	);

	const item = file =>
		`<div class="file-item">${file.name.substring(
			0,
			15
		)}... <button class="remove-btn" onclick="removeFiles(${name}, '${
			file.name
		}')">x</button></div>`;

	document.getElementById(`filelist-${name}`).innerHTML = '';
	for (let file of fileFields[categories[page - 1]][name]) {
		document.getElementById(`filelist-${name}`).innerHTML += item(file);
	}
}

async function saveAnswers() {
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
		...fields.project_updates
	};

	const keys = Object.keys(list);

	for (let key of keys) {
		body.push({ qid: key, answer: list[key] });
	}

	const inputFields = {
		email: email,
		body: body
	};

	try {
		const response = await fetch('https://node.devng.host/api/v1/answers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputFields)
		});
		const result = await response.text();
		if (result === 'Saved successfully') {
			document.getElementById('main').style.display = 'none';
			document.getElementById('header').style.display = 'none';
			document.getElementById('success-wrapper').style.display = 'block';

			setTimeout(() => {
				window.location.href = 'https://binance.sg';
			}, [3000]);
		}
	} catch (error) {
		console.log(error);
	}
}

async function saveFile() {
	const files = {
		7: fileFields.intro['7'],
		11: fileFields.intro['11'],
		30: fileFields.product['30'],
		32: fileFields.product['32'],
		75: fileFields.project_updates['75']
	};

	const keys = Object.keys(files);

	for (let key of keys) {
		if (files[key] !== null) {
			if (files[key]?.length === undefined) {
				const formdata = new FormData();
				formdata.append('file', files[key]);

				try {
					await fetch(`https://node.devng.host/api/v1/answers/upload?email=${email}&qid=${key}`, {
						method: 'POST',
						headers: {
							Authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYxMzgzNTI0MywiZXhwIjoxNzAwMjM1MjQzfQ.MzswXdL1p5cFl-uczUIUSGk4d4LErg78Lb7eFMnIT-o'
						},
						body: formdata
					});
				} catch (error) {
					console.log(error);
				}
			} else {
				for (let file of files[key]) {
					const formdata = new FormData();
					formdata.append('file', file);
					try {
						await fetch(`https://node.devng.host/api/v1/answers/upload?email=${email}&qid=${key}`, {
							method: 'POST',
							headers: {
								Authorization:
									'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYxMzgzNTI0MywiZXhwIjoxNzAwMjM1MjQzfQ.MzswXdL1p5cFl-uczUIUSGk4d4LErg78Lb7eFMnIT-o'
							},
							body: formdata
						});
					} catch (error) {
						console.log(error);
					}
				}
			}
		}
	}
}

async function onSubmit() {
	const callout =
		isFieldEmpty(categories[page - 1], null) || isFieldEmpty('fileFields', categories[page - 1]);
	if (!callout) {
		const btn_wrapper = document.getElementById('buttonwrapper');
		document.getElementById('submit-button').style.display = 'none';

		const img = document.createElement('img');
		img.setAttribute('id', 'loader');
		img.style.width = '16px';
		img.style.height = '16px';
		img.src = 'images/loader.gif';

		btn_wrapper.appendChild(img);

		await saveFile();
		await saveAnswers();

		const loader = document.getElementById('loader');
		btn_wrapper.removeChild(loader);
		document.getElementById('submit-button').style.display = 'inline-block';
	} else {
		calloutError(callout);
	}
}
