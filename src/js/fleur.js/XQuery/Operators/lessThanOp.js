/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XQueryEngine[Fleur.XQueryX.lessThanOp] = function(ctx, children, callback) {
	Fleur.XPathGenTestOpFunction(ctx, children, Fleur.ltOp, callback);
};