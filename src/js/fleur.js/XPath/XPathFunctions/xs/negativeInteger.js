"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.signatures.xs_negativeInteger_1 = {
  need_ctx: false,
  is_async: false,
  return_type: Fleur.Type_negativeInteger,
  params_type: [
    Fleur.atomicTypes
  ]
};
Fleur.Context.prototype.xs_negativeInteger_1 = function() {
	this.typeConstructor(Fleur.Types["http://www.w3.org/2001/XMLSchema"][""]);
	return this;
};

Fleur.XPathFunctions_xs["negativeInteger#1"] = new Fleur.Function("http://www.w3.org/2001/XMLSchema", "xs:negativeInteger",
	function(arg) {
		return Fleur.XPathConstructor(arg, Fleur.Type_negativeInteger, function() {});
	},
	null, [{type: Fleur.Node}], false, false, {type: Fleur.Node});