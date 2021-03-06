/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.signatures.fn_index$_of_2 = {
  need_ctx: false,
  is_async: false,
  return_type: {
    nodeType: Fleur.Node.TEXT_NODE,
    schemaTypeInfo: Fleur.Type_integer,
    occurrence: "*"
  },
  params_type: [
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_anyAtomicType,
      occurrence: "*"
    },
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_anyAtomicType,
      occurrence: "1"
    }
  ]
};
Fleur.signatures.fn_index$_of_3 = {
  need_ctx: false,
  is_async: false,
  return_type: {
    nodeType: Fleur.Node.TEXT_NODE,
    schemaTypeInfo: Fleur.Type_integer,
    occurrence: "*"
  },
  params_type: [
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_anyAtomicType,
      occurrence: "*"
    },
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_anyAtomicType,
      occurrence: "1"
    },
    {
      nodeType: Fleur.Node.TEXT_NODE,
      schemaTypeInfo: Fleur.Type_string,
      occurrence: "1"
    }
  ]
};

Fleur.XPathFunctions_fn["index-of#2"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:index-of",
  function(seq, search) {
    return Fleur.XPathFunctions_fn["index-of#3"].jsfunc(seq, search, "http://www.w3.org/2005/xpath-functions/collation/codepoint");
  },
  null, [{type: Fleur.Node, occurence: "*"}, {type: Fleur.Node}], false, false, {type: Fleur.Type_integer, occurence: "*"});

Fleur.XPathFunctions_fn["index-of#3"] = new Fleur.Function("http://www.w3.org/2005/xpath-functions", "fn:index-of",
  function(seq, search, collation) {
    var c = Fleur.getCollation(collation);
    if (!c) {
      var e = new Error("");
      e.name = "FOCH0002";
      return e;
    }
    var a1 = Fleur.Atomize(seq, true);
    if (a1 === Fleur.EmptySequence || a1.schemaTypeInfo === Fleur.Type_error) {
      return a1;
    }
    var a2 = Fleur.Atomize(search);
    if (a2.schemaTypeInfo === Fleur.Type_error) {
      return a2;
    }
    if (a2.nodeType === Fleur.Node.SEQUENCE_NODE) {
      e = new Error("");
      e.name = "XPTY0004";
      return e;

    }
    var v2 = Fleur.toJSValue(a2, true, true, true, true);
    if (a1.nodeType !== Fleur.Node.SEQUENCE_NODE) {
      var v1 = Fleur.toJSValue(a1, v2[0] < 4, true, true, true);
      if (v1[0] === v2[0] && Fleur.eqOp(v1, v2, c)) {
        a2.schemaTypeInfo = Fleur.Type_integer;
        a2.data = "1";
        return a2;
      }
      return null;
    }
    var result = new Fleur.Sequence();
    a1.childNodes.forEach(function(d, i) {
      var vd = Fleur.toJSValue(d, v2[0] < 4, true, true, true);
      if (vd[0] === v2[0] && Fleur.eqOp(vd, v2, c)) {
        var b = new Fleur.Text();
        b.schemaTypeInfo = Fleur.Type_integer;
        b.data = String(i + 1);
        result.appendChild(b);
      }
    });
    if (result.childNodes.length === 0) {
      result = Fleur.EmptySequence;
    } else if (result.childNodes.length === 1) {
      result = result.childNodes[0];
    }
    return result;
  },
  null, [{type: Fleur.Node, occurence: "*"}, {type: Fleur.Node}, {type: Fleur.Type_string}], false, false, {type: Fleur.Type_integer, occurence: "*"});
/*
Fleur.XPathFunctions_fn["index-of"] = function(ctx, children, callback) {
  if (children.length === 3) {
    Fleur.callback(function() {callback(Fleur.error(ctx, "FOCH0002"));});
    return;
  }
  if (children.length !== 2) {
    Fleur.callback(function() {callback(Fleur.error(ctx, "XPST0017"));});
    return;
  }
  Fleur.XQueryEngine[children[0][0]](ctx, children[0][1], function(n) {
    var a1 = Fleur.Atomize(n);
    if (a1 === Fleur.EmptySequence || a1.schemaTypeInfo === Fleur.Type_error) {
      Fleur.callback(function() {callback(a1);});
      return;
    }
    Fleur.XQueryEngine[children[1][0]](ctx, children[1][1], function(n) {
      var a2 = Fleur.Atomize(n);
      if (a2.schemaTypeInfo === Fleur.Type_error) {
        Fleur.callback(function() {callback(a2);});
        return;
      }
      if (a2.nodeType === Fleur.Node.SEQUENCE_NODE) {
        Fleur.callback(function() {callback(Fleur.error(ctx, "XPTY0004"));});
        return;
      }
      if (Fleur.numericTypes.indexOf(a2.schemaTypeInfo) !== -1) {
        a2.schemaTypeInfo = Fleur.Type_double;
      } else if (a2.schemaTypeInfo === Fleur.Type_untypedAtomic) {
        a2.schemaTypeInfo = Fleur.Type_string;
      }
      if (a1.nodeType !== Fleur.Node.SEQUENCE_NODE) {
        if (Fleur.numericTypes.indexOf(a1.schemaTypeInfo) !== -1) {
          a1.schemaTypeInfo = Fleur.Type_double;
        } else if (a1.schemaTypeInfo === Fleur.Type_untypedAtomic) {
          a1.schemaTypeInfo = Fleur.Type_string;
        }
        if (a1.schemaTypeInfo === Fleur.Type_string && a2.schemaTypeInfo === Fleur.Type_string ?
          a1.data.localeCompare(a2.data) === 0 :
          a1.schemaTypeInfo === a2.schemaTypeInfo && a1.data === a2.data) {
          a2.schemaTypeInfo = Fleur.Type_integer;
          a2.data = "1";
          Fleur.callback(function() {callback(a2);});
          return;
        }
        Fleur.callback(function() {callback(Fleur.EmptySequence);});
        return;
      }
      var result = new Fleur.Sequence();
      a1.childNodes.forEach(function(c, i) {
        if (c.schemaTypeInfo === Fleur.Type_string && a2.schemaTypeInfo === Fleur.Type_string ?
          c.data.localeCompare(a2.data) === 0 :
          c.schemaTypeInfo === c.schemaTypeInfo && c.data === a2.data) {
            var b = new Fleur.Text();
            b.schemaTypeInfo = Fleur.Type_integer;
            b.data = "" + (i + 1);
            result.appendChild(b);
        }
      });
      if (result.childNodes.length === 0) {
        result = Fleur.EmptySequence;
      } else if (result.childNodes.length === 1) {
        result = result.childNodes[0];
      }
      Fleur.callback(function() {callback(result);});
    });
  });
};
*/