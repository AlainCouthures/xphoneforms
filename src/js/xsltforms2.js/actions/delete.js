/*eslint-env browser*/
/*globals XsltForms_binding XsltForms_xpath XsltForms_abstractAction XsltForms_browser XsltForms_engine XsltForms_exprContext Fleur XsltForms_mipbinding XsltForms_xmlevents*/
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module delete
 * @description  === "XsltForms_Delete" class ===
 * Delete Action Class
 * * constructor function : resolves the properties of this delete action
 */
		
function XsltForms_delete(subform, nodeset, model, bind, at, context, ifexpr, whileexpr, iterateexpr) {
	this.subform = subform;
	this.binding = new XsltForms_binding(null, nodeset, model, bind);
	//this.at = at?XsltForms_xpath.get(at):null;
	this.at = XsltForms_xpath.get(at);
	this.context = XsltForms_xpath.get(context);
	this.init(ifexpr, whileexpr, iterateexpr);
}

XsltForms_delete.prototype = new XsltForms_abstractAction();


		
/**
 * * '''run''' method : executes this delete action and dispatches "xforms-delete"
 */

XsltForms_delete.prototype.run = function(element, ctx) {
	var i, len;
	if (this.context) {
		ctx = this.context.xpath_evaluate(ctx, null, this.subform)[0];
	}
	if (!ctx) {
		return;
	}
	var varresolver = this.parentAction ? this.parentAction.varResolver : element.xfElement.varResolver;
	var nodes = this.binding.bind_evaluate(this.subform, ctx, varresolver);
	for (i = 0; i < nodes.length; i++) {
		if (!nodes[i].ownerDocument || nodes[i].ownerDocument.documentElement === nodes[i]) {
			nodes.splice(i, 1);
			i--;
		}
	}
	if(this.at) {
		var index = XsltForms_engine.numberValue(this.at.xpath_evaluate(new XsltForms_exprContext(this.subform, ctx, 1, nodes, null, null, null, varresolver)));
		if(!nodes[index - 1]) {
			return;
		}
		nodes = [nodes[index - 1]];
	}
	var model;
	var instance;
	if (nodes.length > 0) {
		model = document.getElementById(XsltForms_browser.getDocMeta(nodes[0].nodeType === Fleur.Node.DOCUMENT_NODE ? nodes[0] : nodes[0].ownerDocument, "model")).xfElement;
		instance = model.findInstance(nodes[0]);
	}
	var deletedNodes = [];
	for (i = 0, len = nodes.length; i < len; i++) {
		var node = nodes[i];
		XsltForms_mipbinding.nodedispose(node);
		var repeat = XsltForms_browser.getMeta(node, "repeat");
		if (repeat) {
			document.getElementById(repeat).xfElement.deleteNode(node);
		}
		if (node.nodeType === Fleur.Node.ATTRIBUTE_NODE) {
			var oldOwnerElement = node.ownerElement? node.ownerElement: node.selectSingleNode("..");
			//XsltForms_browser.clearMeta(node);
			if (oldOwnerElement.removeAttributeNS) {
				oldOwnerElement.removeAttributeNS(node.namespaceURI, node.nodeName);
			} else {
				oldOwnerElement.removeAttributeNode(node);
			}
			if (!XsltForms_browser.isIE && !XsltForms_browser.isIE11) {
				node.oldOwnerElement = oldOwnerElement;
			}
		} else {
			node.parentNode.removeChild(node);
		}
		deletedNodes.push(node);
	}
	if (deletedNodes.length > 0) {
		XsltForms_engine.addChange(model);
		model.setRebuilded(true);
		var evcontext = {"deleted-nodes": deletedNodes, "delete-location": index};
		XsltForms_xmlevents.dispatch(instance, "xforms-delete", null, null, null, null, evcontext);
	}
};