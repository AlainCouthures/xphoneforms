"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.signatures.fn_position_0 = {
  need_ctx: false,
  is_async: false,
  return_type: {
    nodeType: Fleur.Node.TEXT_NODE,
    schemaTypeInfo: Fleur.Type_integer,
    occurrence: "?"
  },
  params_type: []
};

Fleur.Context.prototype.fn_position_0 = function() {
  this.itemstack.push(this.item);
  const item = new Fleur.Text();
  item.data = String(this.position);
  item.schemaTypeInfo = Fleur.Type_integer;
  this.item = item;
  return this;
};

Fleur.XPathFunctions_fn["position#0"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:position",
  function(ctx) {
    return ctx._pos;
  },
  null, [], true, false, {type: Fleur.Type_integer});