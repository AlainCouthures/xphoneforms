/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XPathFunctions_fn["subsequence#2"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:subsequence",
	function(sourceSeq, startingLoc) {
		return Fleur.XPathFunctions_fn["subsequence#3"].jsfunc(sourceSeq, startingLoc, Number.POSITIVE_INFINITY);
	},
	null, [{type: Fleur.Node, occurence: "*"}, {type: Fleur.numericTypes}], false, false, {type: Fleur.Node});

Fleur.XPathFunctions_fn["subsequence#3"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:subsequence",
	function(sourceSeq, startingLoc, length) {
		if (startingLoc === Number.NEGATIVE_INFINITY && length === Number.POSITIVE_INFINITY) {
			return Fleur.EmptySequence;
		}
		if (typeof length === "number") {
			length = Math.round(length);
		}
		if (typeof startingLoc === "number") {
			startingLoc = Math.round(startingLoc);
		}
		if (length <= 0) {
			return Fleur.EmptySequence;
		}
		if (Number(length) === 1 || (sourceSeq.nodeType === Fleur.Node.SEQUENCE_NODE && Number(startingLoc) === sourceSeq.childNodes.length && length > 1)) {
			if (sourceSeq.nodeType !== Fleur.Node.SEQUENCE_NODE) {
				return Number(startingLoc) === 1 ? sourceSeq : Fleur.EmptySequence;
			}
			if (startingLoc <= sourceSeq.childNodes.length) {
				return sourceSeq.childNodes[Number(startingLoc) - 1];
			}
			return Fleur.EmptySequence;
		}
		if (sourceSeq.nodeType !== Fleur.Node.SEQUENCE_NODE) {
			return Number(startingLoc) === 1 ? sourceSeq : Fleur.EmptySequence;
		}
		var seq = new Fleur.Sequence();
		for (var i = Number(startingLoc) - 1, l = Math.min(i + Number(length), sourceSeq.childNodes.length); i < l; i++) {
			seq.appendChild(sourceSeq.childNodes[i]);
		}
		return seq;
	},
	null, [{type: Fleur.Node, occurence: "*"}, {type: Fleur.numericTypes}, {type: Fleur.numericTypes}], false, false, {type: Fleur.Node});