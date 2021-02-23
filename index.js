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
		30: null,
		32: null
	},
	project_updates: {
		75: null
	}
};

let getCategories = () => {
	return Object.keys(fields);
};

let isFieldEmpty = (step, fileCategory) => {
	const keys =
		step === 'fileFields' ? Object.keys(fileFields[fileCategory] || {}) : Object.keys(fields[step]);
	let callout;
	// const names = ['7', '11', '30', '32', '75'];
	console.log(fields['intro']['1'] === '' || fields['intro']['1']?.length < 1);
	console.log(fileFields['intro']['7'] === null || fileFields['intro']['7']?.length < 1);
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

function getSections() {
	const children = document.getElementById('form').children;

	console;

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
	getSections();
}

function onNext() {
	const callout =
		isFieldEmpty(categories[page - 1], null) || isFieldEmpty('fileFields', categories[page - 1]);
	if (!callout) {
		moveToNextPage();
		getSections();
	} else {
		calloutError(callout);
	}
}

function onPrevious() {
	moveToPreviousPage();

	getSections();
}

function onChange(name, value) {
	if (name === 'email') {
		email = value;
		fetch(`http://node.devng.host/api/v1/answers/email/${email}`, {
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

		if (fields[categories[page - 1]]['9'] === 'Yes') {
			freshApplication = false;
		} else {
			freshApplication = true;
		}
	}
}

function onSelectOtherCheckbox(name, value) {
	const isOtherField = fields[categories[page - 1]][name].find(
		str => str !== 'CEO' && str !== 'Founder/Co-founder'
	);

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
	fileFields[categories[page - 1]][input.name] = input.files[0];

	document.getElementById(
		`filelist-${input.name}`
	).innerHTML = `<div class="file-item">${input.files[0].name.substring(
		0,
		15
	)}... <button class="remove-btn" onclick="removeFile(${input.name})">x</button></div>`;

	document.getElementById(input.name).style.display = 'none';
	document.getElementById(`file-input-${input.name}`).style.display = 'none';

	console.log(fileFields);
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
		)}... <button class="remove-btn" onclick="removeFiles(${input.name}, ${
			file.name
		})">x</button></div>`;

	document.getElementById(`filelist-${input.name}`).innerHTML = '';
	for (let file of fileFields[categories[page - 1]][input.name]) {
		document.getElementById(`filelist-${input.name}`).innerHTML += item(file);
	}

	console.log(fileFields);
}

function removeFile(name) {
	fileFields[categories[page - 1]][name] = null;

	document.getElementById(name).style.display = 'block';
	document.getElementById(`file-input-${name}`).style.display = 'block';

	document.getElementById(`filelist-${name}`).innerHTML = '';

	console.log(fileFields);
}

function removeFiles(name, fileName) {
	fileFields[categories[page - 1]][name] = fileFields[categories[page - 1]][name].filter(
		file => file.name !== fileName
	);

	console.log(fileFields[categories[page - 1]][name]);

	const item = file =>
		`<div class="file-item">${file.name.substring(
			0,
			15
		)}... <button class="remove-btn" onclick="removeFiles(${name}, ${file.name})">x</button></div>`;

	document.getElementById(`filelist-${name}`).innerHTML = '';
	for (let file of fileFields[categories[page - 1]][name]) {
		console.log(file);
		document.getElementById(`filelist-${name}`).innerHTML += item(file);
	}

	console.log(fileFields);
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
		const response = await fetch('http://node.devng.host/api/v1/answers', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputFields)
		});
		const result = response.text();
		console.log(result);
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
		console.log(files[key]);
		console.log(files[key]?.length);
		if (files[key] !== null) {
			if (files[key]?.length === undefined) {
				const formdata = new FormData();
				formdata.append('file', files[key]);

				try {
					const response = await fetch(
						`http://node.devng.host/api/v1/answers/upload?email=${email}&qid=${key}`,
						{
							method: 'POST',
							// mode: 'no-cors',
							headers: {
								Authorization:
									'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYxMzgzNTI0MywiZXhwIjoxNzAwMjM1MjQzfQ.MzswXdL1p5cFl-uczUIUSGk4d4LErg78Lb7eFMnIT-o'
							},
							body: formdata
						}
					);

					const result = response.text();
					console.log(result);
				} catch (error) {
					console.log(error);
				}
			} else {
				for (let file of files[key]) {
					const formdata = new FormData();
					console.log(file);
					formdata.append('file', file);
					try {
						const response = await fetch(
							`http://node.devng.host/api/v1/answers/upload?email=${email}&qid=${key}`,
							{
								method: 'POST',
								// mode: 'no-cors',
								headers: {
									Authorization:
										'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTYxMzgzNTI0MywiZXhwIjoxNzAwMjM1MjQzfQ.MzswXdL1p5cFl-uczUIUSGk4d4LErg78Lb7eFMnIT-o'
								},
								body: formdata
							}
						);
						const result = response.text();
						console.log(result);
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
		await saveFile();
		await saveAnswers();
	} else {
		calloutError(callout);
	}
}

//TODO: HANDLE WHEN 'OTHERS' IS UNCHECKED
