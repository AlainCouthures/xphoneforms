"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.signatures.fn_data_0 = {
  need_ctx: false,
  is_async: false,
  return_type: null,
  params_type: []
};

Fleur.XPathFunctions_fn["data#0"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:data",
  function(ctx) {
    return Fleur.XPathFunctions_fn["data#1"].jsfunc(ctx._curr);
  },
  null, [], true, false, {type: Fleur.Node, occurence: "*"});

Fleur.XPathFunctions_fn["data#1"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:data",
  function(arg) {
    return Fleur.Atomize(arg, true);
  },
  null, [{type: Fleur.Node, occurence: "*"}], true, false, {type: Fleur.Node, occurence: "*"});