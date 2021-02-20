let page = 1;
let totalPages = 9;
let freshApplication = true;

function getPage() {
	fetch(`sections/section-${page}.html`)
		.then(function (response) {
			return response.text();
		})
		.then(function (body) {
			document.getElementById('form').innerHTML = body;
		});
	window.scrollTo(0, 0);

	document.getElementById('next-button').style.display =
		page !== totalPages ? 'inline-block' : 'none';
	document.getElementById('prev-button').style.display = page === 1 ? 'none' : 'inline-block';
	document.getElementById('submit-button').style.display =
		page === totalPages ? 'inline-block' : 'none';
}

function loadhtml() {
	getPage();
}

function onNext() {
	if (!freshApplication) page = 10;
	else {
		if (page < totalPages) page++;
	}

	getPage();
}

function onPrevious() {
	if (!freshApplication) page = 1;
	else {
		if (page > 1) page--;
	}
	getPage();
}
