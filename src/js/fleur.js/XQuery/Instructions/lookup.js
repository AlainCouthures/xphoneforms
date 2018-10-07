/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.lookup] = function(ctx, children, callback) {
//console.log("lookup - " + pos + " - " + Fleur.Serializer._serializeNodeToXQuery(ctx._curr, false, ""));
	var ncname, ilabel, seq;
	if (ctx._label) {
		if (children[0][0] === Fleur.XQueryX.NCName) {
			ncname = children[0][1][0];
			if (ncname !== ctx._label) {
				Fleur.callback(function() {callback(Fleur.EmptySequence, Fleur.XQueryX.lookup);});
			} else {
				ctx._curr.collabels = null;
				Fleur.callback(function() {callback(ctx._curr, Fleur.XQueryX.lookup);});
			}
		} else {
			Fleur.XQueryEngine[children[0][1][0][0]](ctx, children[0][1][0][1], function(n) {
				var a = Fleur.Atomize(n);
				if (a.nodeType !== Fleur.Node.TEXT_NODE) {
					Fleur.callback(function() {callback(a, Fleur.XQueryX.lookup);});
				} else {
					if (a.data !== ctx._label) {
						Fleur.callback(function() {callback(Fleur.EmptySequence, Fleur.XQueryX.lookup);});
					} else {
						ctx._curr.collabels = null;
						Fleur.callback(function() {callback(ctx._curr, Fleur.XQueryX.lookup);});
					}
				}
			});
		}
		return;
	} else if (ctx._curr.collabels) {
		if (children[0][0] === Fleur.XQueryX.NCName) {
			ncname = children[0][1][0];
			ilabel = ctx._curr.collabels.indexOf(ncname);
			if (ilabel === -1) {
				Fleur.callback(function() {callback(Fleur.EmptySequence, Fleur.XQueryX.lookup);});
			} else if (ctx._curr.childNodes[ilabel].nodeType === Fleur.Node.MULTIDIM_NODE) {
				seq = new Fleur.Sequence();
				seq.appendChild(ctx._curr.childNodes[ilabel]);
				Fleur.callback(function() {callback(seq, Fleur.XQueryX.lookup);});
			} else {
				Fleur.callback(function() {callback(ctx._curr.childNodes[ilabel], Fleur.XQueryX.lookup);});
			}
		} else {
			Fleur.XQueryEngine[children[0][1][0][0]](ctx, children[0][1][0][1], function(n) {
				var a = Fleur.Atomize(n);
				if (a.nodeType !== Fleur.Node.TEXT_NODE) {
					Fleur.callback(function() {callback(a, Fleur.XQueryX.lookup);});
				} else {
					ilabel = ctx._curr.collabels.indexOf(a.data);
					Fleur.callback(function() {callback(ilabel === -1 ? Fleur.EmptySequence : ctx._curr.childNodes[ilabel], Fleur.XQueryX.lookup);});
				}
			});
		}
		return;
	}
	var parents = [];
	if (ctx._curr.nodeType === Fleur.Node.MAP_NODE || ctx._curr.nodeType === Fleur.Node.ARRAY_NODE) {
		parents.push(ctx._curr);
	} else if (ctx._curr.childNodes) {
		parents = ctx._curr.childNodes.filter(function(c) { return c.nodeType === Fleur.Node.MAP_NODE || c.nodeType === Fleur.Node.ARRAY_NODE;});	
	}
	if (parents.length === 0) {
		Fleur.callback(function() {callback(Fleur.EmptySequence, Fleur.XQueryX.lookup);});
		return;
	}
	seq = new Fleur.Sequence();
	seq.childNodes = new Fleur.NodeList();
	if (children[0][0] === Fleur.XQueryX.NCName) {
		ncname = children[0][1][0];
		parents.forEach(function(p) {
			var e;
			if (p.nodeType === Fleur.Node.MAP_NODE) {
				e = p.getEntryNode(ncname);
				if (e) {
					seq.appendChild(e);
				}
			}
		});
		if (seq.childNodes.length === 0) {
			seq = Fleur.EmptySequence;
		} else if (seq.childNodes.length === 1) {
			seq = seq.childNodes[0];
		}
		Fleur.callback(function() {callback(seq, Fleur.XQueryX.lookup);});
	} else if (children[0][0] === Fleur.XQueryX.integerConstantExpr) {
		var idx = parseInt(children[0][1][0][1][0], 10) - 1;
		parents.forEach(function(p) {
			var e;
			if (p.nodeType === Fleur.Node.ARRAY_NODE) {
				e = p.childNodes[idx];
				if (e) {
					seq.appendChild(e);
				}
			}
		});
		if (seq.childNodes.length === 0) {
			seq = Fleur.EmptySequence;
		} else if (seq.childNodes.length === 1) {
			seq = seq.childNodes[0];
		}
		Fleur.callback(function() {callback(seq, Fleur.XQueryX.lookup);});
	} else if (children[0][0] === Fleur.XQueryX.star) {
		parents.forEach(function(p) {
			if (p.nodeType === Fleur.Node.MAP_NODE) {
				p.entries.forEach(function(e) {
					seq.appendChild(e);
				});
			} else {
				p.childNodes.forEach(function(e) {
					seq.appendChild(e);
				});
			}
		});
		if (seq.childNodes.length === 0) {
			seq = Fleur.EmptySequence;
		} else if (seq.childNodes.length === 1) {
			seq = seq.childNodes[0];
		}
		Fleur.callback(function() {callback(seq, Fleur.XQueryX.lookup);});
	} else {
		Fleur.XQueryEngine[children[0][1][0][0]](ctx, children[0][1][0][1], function(n) {
			var a = Fleur.Atomize(n);
			if (a.nodeType !== Fleur.Node.TEXT_NODE) {
				Fleur.callback(function() {callback(a);});
			} else {
				parents.forEach(function(p) {
					var e; 
					if (p.nodeType === Fleur.Node.MAP_NODE) {
						e = p.getEntryNode(a.data);
					} else {
						e = p.childNodes[parseInt(a.data, 10) - 1];
					}
					if (e) {
						seq.appendChild(e);
					}
				});
				if (seq.childNodes.length === 0) {
					seq = Fleur.EmptySequence;
				} else if (seq.childNodes.length === 1) {
					seq = seq.childNodes[0];
				}
				Fleur.callback(function() {callback(seq, Fleur.XQueryX.lookup);});
			}
		});
	}
};