"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.signatures.xf_instance_0 = {
  need_ctx: false,
  is_async: false,
  return_type: null,
  params_type: []
};
Fleur.signatures.xf_instance_1 = {
  need_ctx: false,
  is_async: false,
  return_type: null,
  params_type: [
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_string,
      occurrence: "1"
    }
  ]
};
Fleur.Context.prototype.xf_instance_0 = function() {
  this.itemstack.push(this.item);
  this.item = this.path.ownerDocument ? this.path.ownerDocument.documentElement : this.path.documentElement;
  this.addnodedep(this.item);
  return this;
};
Fleur.Context.prototype.xf_instance_1 = function() {
  const instance = document.getElementById(this.item.data);
  this.item = instance.xfElement.doc.documentElement;
  this.addnodedep(this.item);
  return this;
};