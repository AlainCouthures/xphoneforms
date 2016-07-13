/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.orOp] = function(ctx, children, callback) {
	Fleur.XQueryEngine[children[0][1][0][0]](ctx, children[0][1][0][1], function(n) {
		var op1;
		var a1 = Fleur.Atomize(n);
		op1 = Fleur.toJSBoolean(a1);
		if (op1[0] < 0) {
			Fleur.callback(function() {callback(a1);});
			return;
		}
		if (op1[1]) {
			a1.data = "true";
			a1.schemaTypeInfo = Fleur.Type_boolean;
			Fleur.callback(function() {callback(a1);});
		} else {
			Fleur.XQueryEngine[children[1][1][0][0]](ctx, children[1][1][0][1], function(n) {
				var op2;
				var a2 = Fleur.Atomize(n);
				op2 = Fleur.toJSBoolean(a2);
				if (op2[0] < 0) {
					Fleur.callback(function() {callback(a2);});
					return;
				}
				a2.data = "" + op2[1];
				a2.schemaTypeInfo = Fleur.Type_boolean;
				Fleur.callback(function() {callback(a2);});
			});
		}
	});
};