/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.andOp] = function(ctx, children, callback) {
	var op1;
	Fleur.XQueryEngine[children[0][1][0][0]](ctx, children[0][1][0][1], function(n) {
		var a1 = Fleur.Atomize(n);
		op1 = Fleur.toJSBoolean(a1);
		if (op1[0] < 0) {
			callback(n);
			return;
		}
		if (!op1[1]) {
			a1.data = "false";
			a1.schemaTypeInfo = Fleur.Type_boolean;
			callback(a1);
		} else {
			Fleur.XQueryEngine[children[1][1][0][0]](ctx, children[1][1][0][1], function(n) {
				var op2;
				var a2 = Fleur.Atomize(n);
				op2 = Fleur.toJSBoolean(a2);
				if (op2[0] < 0) {
					callback(n);
					return;
				}
				a2.data = "" + op2[1];
				a2.schemaTypeInfo = Fleur.Type_boolean;
				callback(a2);
			});
		}
	});
};