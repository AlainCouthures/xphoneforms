/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.sequenceExpr] = function(ctx, children, callback) {
	if (children.length === 0) {
		callback(Fleur.EmptySequence);
		return;
	}
	var result;
	var cb = function(n, eob) {
		if (eob) {
			if (result === Fleur.EmptySequence) {
				result = n;
			} else if (n !== Fleur.EmptySequence) {
				if (result.nodeType !== Fleur.Node.SEQUENCE_NODE) {
					var seq = new Fleur.Sequence();
					seq.appendChild(result);
					result = seq;
				}
				if (n.nodeType !== Fleur.Node.SEQUENCE_NODE) {
					result.appendChild(n);
				} else {
					n.childNodes.forEach(function(child) {result.appendChild(child);});
				}
			}
			callback(result, true);
			return;
		}
		if (children.length === 1) {
			callback(n, true);
			return;
		}
		result = n;
		Fleur.XQueryEngine[Fleur.XQueryX.sequenceExpr](ctx, children.slice(1), cb);
	};
	Fleur.XQueryEngine[children[0][0]](ctx, children[0][1], cb);
};