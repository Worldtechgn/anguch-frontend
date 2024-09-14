import React from "react";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ExportExcels = ReactHTMLTableToExcel.format = (s, c) => {
	if (c && c['table']) {
		const html = c.table;
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const rows = doc.querySelectorAll('tr');

		for (const row of rows) row.removeChild(row.firstChild);

		c.table = doc.querySelector('table').outerHTML;
	}

	return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

export default ExportExcels;