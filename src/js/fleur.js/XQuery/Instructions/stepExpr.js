/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.stepExpr] = function(ctx, children, callback) {
//console.log("stepExpr - 1 - " + Fleur.Serializer._serializeNodeToXQuery(ctx._curr, false, ""));
	var next;
	var result = Fleur.EmptySequence;
	var cb = function(n, eob) {
		var subcurr;
		if (eob === Fleur.XQueryX.stepExpr) {
			if (n !== Fleur.EmptySequence) {
				if (result === Fleur.EmptySequence) {
					result = n;
				} else {
					if (result.nodeType !== Fleur.Node.SEQUENCE_NODE) {
						var seq = new Fleur.Sequence();
						seq.childNodes = new Fleur.NodeList();
						seq.children = new Fleur.NodeList();
						seq.textContent = "";
						seq.appendChild(result);
						result = seq;
					}
					if (n.nodeType !== Fleur.Node.SEQUENCE_NODE) {
						result.appendChild(n);
					} else {
						n.childNodes.forEach(function(node) {
							result.appendChild(node);
						});
					}
				}
			}
			n = next;
		}
//console.log("stepExpr - cb - n=" + Fleur.Serializer._serializeNodeToXQuery(n, false, "") + " result=" + Fleur.Serializer._serializeNodeToXQuery(result, false, "") + (eob ? " - " + (eob === Fleur.XQueryX.stepExpr ? "stepExpr" : "predicates") : ""));
		if (n === Fleur.EmptySequence) {
//console.log("n === Fleur.EmptySequence");
			if (eob === Fleur.XQueryX.stepExpr && result !== Fleur.EmptySequence && callback !== cb && (children[children.length - 1][0] === Fleur.XQueryX.predicates || children[children.length - 1][0] === Fleur.XQueryX.predicate || children[children.length - 1][0] === Fleur.XQueryX.lookup)) {
				var predpos = children.length - 1;
				var preds = children[children.length - 1][1];
				if (children[children.length - 1][0] !== Fleur.XQueryX.predicates) {
					while (children[predpos][0] === Fleur.XQueryX.predicate || children[predpos][0] === Fleur.XQueryX.lookup) {
						predpos--;
					}
					preds = children.slice(predpos + 1);
				}
				Fleur.XQueryEngine[Fleur.XQueryX.predicates]({
					_next: result,
					env: ctx.env
				}, preds, function(n) {
					Fleur.callback(function() {callback(n, Fleur.XQueryX.stepExpr);});
				});
				return;
			}
			Fleur.callback(function() {callback(result, Fleur.XQueryX.stepExpr);});
			return;
		}
//console.log("children.length="+children.length+(children.length === 2?" predicates="+(children[1][0] === Fleur.XQueryX.predicates):""));
		if (children.length === 1) {
			Fleur.callback(function() {callback(n, Fleur.XQueryX.stepExpr);});
			return;
		}
		if (children.length > 1 && (children[1][0] === Fleur.XQueryX.predicates || children[1][0] === Fleur.XQueryX.predicate || children[1][0] === Fleur.XQueryX.lookup)) {
			Fleur.callback(function() {next = Fleur.EmptySequence; cb(n, Fleur.XQueryX.stepExpr);});
			return;
		}
		if (n.nodeType === Fleur.Node.SEQUENCE_NODE) {
			subcurr = n.childNodes.shift();
			if (n.childNodes.length === 1) {
				n = n.childNodes[0];
			}
		} else {
			subcurr = n;
			n = Fleur.EmptySequence;
		}
		next = n;
		Fleur.XQueryEngine[Fleur.XQueryX.stepExpr]({
				_curr: subcurr,
				env: ctx.env
			}, children.slice(1), cb);
	};
	Fleur.XQueryEngine[children[0][0]](ctx, children[0][1], cb);
};