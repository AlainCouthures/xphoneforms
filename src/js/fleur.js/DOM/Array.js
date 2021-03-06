/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.Array = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.ARRAY_NODE;
	this.nodeName = "#array";
};
Fleur.Array.prototype = new Fleur.Node();