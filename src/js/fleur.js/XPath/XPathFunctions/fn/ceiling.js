/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XPathFunctions_fn["ceiling#1"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:ceiling",
	function(a) {
		return Math.ceil(a);
	},
	null, [{type: Fleur.Type_double, occurence: "?"}], false, false, {type: Fleur.Type_integer});