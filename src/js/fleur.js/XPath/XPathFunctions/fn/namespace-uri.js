/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XPathFunctions_fn["namespace-uri#0"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:namespace-uri",
	function(ctx) {
		if (ctx._curr === null) {
			return null;
		}
		if (ctx._curr.nodeType === Fleur.Node.DOCUMENT_NODE || ctx._curr.nodeType === Fleur.Node.COMMENT_NODE || ctx._curr.nodeType === Fleur.Node.TEXT_NODE) {
			return "";
		}
		return ctx._curr.namespaceURI;
	},
	null, [{type: Fleur.Node, occurence: "?"}], true, false, {type: Fleur.Type_anyURI});

Fleur.XPathFunctions_fn["namespace-uri#1"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:namespace-uri",
	function(node) {
		if (node === null) {
			return null;
		}
		if (node.nodeType === Fleur.Node.DOCUMENT_NODE || node.nodeType === Fleur.Node.COMMENT_NODE || node.nodeType === Fleur.Node.TEXT_NODE) {
			return "";
		}
		return node.namespaceURI;
	},
	null, [{type: Fleur.Node, occurence: "?"}], false, false, {type: Fleur.Type_anyURI});