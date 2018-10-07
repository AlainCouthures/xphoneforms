/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.XPathFunctions_xs["float"] = function(ctx, children, callback) {
	Fleur.XPathConstructor(ctx, children, Fleur.Type_float, function() {}, callback);
};