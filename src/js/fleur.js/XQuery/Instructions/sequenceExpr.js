/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.sequenceExpr] = function(ctx, children, callback, depth) {
	if (!depth) {
		depth = 0;
	}
	if (children.length === 0) {
		Fleur.callback(function() {callback(Fleur.EmptySequence, depth);});
		return;
	}
	var i, l;
	var result = Fleur.EmptySequence;
	var cb = function(n, eob) {
		var seq;
		if (eob === depth) {
			if ((result === Fleur.EmptySequence && n.nodeType !== Fleur.Node.SEQUENCE_NODE && n.nodeType !== Fleur.Node.MULTIDIM_NODE) || (n.nodeType === Fleur.Node.TEXT_NODE && n.schemaTypeInfo === Fleur.Type_error)) {
				result = n;
			} else if (n !== Fleur.EmptySequence && (result.nodeType !== Fleur.Node.TEXT_NODE || result.schemaTypeInfo !== Fleur.Type_error)) {
				if (result === Fleur.EmptySequence || result.nodeType !== Fleur.Node.SEQUENCE_NODE) {
					seq = new Fleur.Sequence();
					seq.childNodes = new Fleur.NodeList();
					seq.children = new Fleur.NodeList();
					seq.textContent = "";
					if (result !== Fleur.EmptySequence) {
						seq.appendChild(result);
					}
					result = seq;
				}
				if (n.nodeType !== Fleur.Node.SEQUENCE_NODE) {
					result.appendChild(n);
				} else if (result.childNodes.length !== 0 && result.childNodes[0].nodeType === Fleur.Node.MULTIDIM_NODE) {
					for (i = 0, l = result.childNodes.length; i < l; i++) {
						n.childNodes[i].childNodes.forEach(function(child) {result.childNodes[i].appendChild(child);});
					}
				} else {
					n.childNodes.forEach(function(child) {result.appendChild(child);});
				}
			}
			Fleur.callback(function() {callback(result, depth);});
			return;
		}
		if (children.length === 1) {
			Fleur.callback(function() {callback(n, depth);});
			return;
		}
		if ((result === Fleur.EmptySequence && n.nodeType !== Fleur.Node.SEQUENCE_NODE && n.nodeType !== Fleur.Node.MULTIDIM_NODE) || (n.nodeType === Fleur.Node.TEXT_NODE && n.schemaTypeInfo === Fleur.Type_error)) {
			result = n;
		} else if (n !== Fleur.EmptySequence && (result.nodeType !== Fleur.Node.TEXT_NODE || result.schemaTypeInfo !== Fleur.Type_error)) {
			if (result === Fleur.EmptySequence || result.nodeType !== Fleur.Node.SEQUENCE_NODE) {
				seq = new Fleur.Sequence();
				seq.childNodes = new Fleur.NodeList();
				seq.children = new Fleur.NodeList();
				seq.textContent = "";
				if (result !== Fleur.EmptySequence) {
					seq.appendChild(result);
				}
				result = seq;
			}
			if (n.nodeType !== Fleur.Node.SEQUENCE_NODE) {
				result.appendChild(n);
			} else if (result.childNodes.length !== 0 && result.childNodes[0].nodeType === Fleur.Node.MULTIDIM_NODE) {
				for (i = 0, l = result.childNodes.length; i < l; i++) {
					n.childNodes[i].childNodes.forEach(function(child) {result.childNodes[i].appendChild(child);});
				}
			} else {
				n.childNodes.forEach(function(child) {result.appendChild(child);});
			}
		}
		Fleur.XQueryEngine[Fleur.XQueryX.sequenceExpr](ctx, children.slice(1), cb, depth);
	};
	Fleur.XQueryEngine[children[0][0]](ctx, children[0][1], cb, children[0][0] === Fleur.XQueryX.sequenceExpr ? depth + 1 : depth);
};