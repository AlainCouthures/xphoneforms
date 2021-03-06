"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.signatures.fn_normalize$_unicode_1 = {
  need_ctx: false,
  is_async: false,
  return_type: {
    nodeType: Fleur.Node.TEXT_NODE,
    schemaTypeInfo: Fleur.Type_string,
    occurrence: "1"
  },
  params_type: [
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_string,
      occurrence: "?"
    }
  ]
};
Fleur.signatures.fn_normalize$_unicode_2 = {
  need_ctx: false,
  is_async: false,
  return_type: {
    nodeType: Fleur.Node.TEXT_NODE,
    schemaTypeInfo: Fleur.Type_string,
    occurrence: "1"
  },
  params_type: [
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_string,
      occurrence: "?"
    },
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_string,
      occurrence: "1"
    }
  ]
};

Fleur.XPathFunctions_fn["normalize-unicode#1"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:normalize-unicode",
  function(arg) {
    if (!arg) {
      return "";
    }
    return arg.normalize();
  },
  null, [{type: Fleur.Type_string, occurence: "?"}], false, false, {type: Fleur.Type_string});

Fleur.XPathFunctions_fn["normalize-unicode#2"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:normalize-unicode",
  function(arg, normalizationForm) {
    if (!arg) {
      return "";
    }
    normalizationForm = normalizationForm.toUpperCase().trim();
    if (normalizationForm === "") {
      return arg;
    }
    try {
      return arg.normalize(normalizationForm);
    } catch(e) {
      return arg;
    }
  },
  null, [{type: Fleur.Type_string, occurence: "?"}, {type: Fleur.Type_string}], false, false, {type: Fleur.Type_string});