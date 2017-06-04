/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XPathFunctions_fn["substring-after#2"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:substring-after",
	function(a, b) {
		if (!a) {
			return "";
		}
		if (!b || b === "") {
			return a;
		}
		var index = a.indexOf(b);
		return index === -1 ? "" : a.substring(index + b.length);
	},
	null, [{type: Fleur.Type_string, occurence: "?"}, {type: Fleur.Type_string, occurence: "?"}], false, false, {type: Fleur.Type_string, occurence: "?"});