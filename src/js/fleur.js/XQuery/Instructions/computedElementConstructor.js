/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.computedElementConstructor] = function(ctx, children, callback) {
	var elt = new Fleur.Element();
	if (children[0][0] === Fleur.XQueryX.tagName) {
		elt.name = children[0][1][0];
		elt.namespaceURI = null;
		elt.nodeName = children[0][1][0];
		Fleur.XQueryEngine[children[1][1][0][0]](ctx, children[1][1][0][1], function(n) {
			elt.appendChild(n);
			Fleur.callback(function() {callback(elt);});
		});
	} else {
		Fleur.XQueryEngine[children[0][1][0][0]](ctx, children[0][1][0][1], function(n) {
			var a = Fleur.Atomize(n);
			if (a.nodeType !== Fleur.Node.TEXT_NODE) {
				Fleur.callback(function() {callback(a);});
			} else {
				elt.nodeName = a.data;
				elt.namespaceURI = null;
				elt.localName = a.data;
				Fleur.XQueryEngine[children[1][1][0][0]](ctx, children[1][1][0][1], function(n) {
					elt.appendChild(n);
					Fleur.callback(function() {callback(elt);});
				});
			}
		});
	}
};