/*eslint-env browser, node*/
/*globals XsltForms_domEngine */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module fleur
 * @description  === "Fleur" class ===
 * Fleur class for DOM
 */

if (XsltForms_domEngine === "") {
	(function(Fleur) {

	Fleur.Node = function() {};
	Fleur.Node.ELEMENT_NODE = 1;
	Fleur.Node.ATTRIBUTE_NODE = 2;
	Fleur.Node.TEXT_NODE = 3;
	Fleur.Node.CDATA_NODE = 4;
	Fleur.Node.ENTITY_REFERENCE_NODE = 5;
	Fleur.Node.ENTITY_NODE = 6;
	Fleur.Node.PROCESSING_INSTRUCTION_NODE = 7;
	Fleur.Node.COMMENT_NODE = 8;
	Fleur.Node.DOCUMENT_NODE = 9;
	Fleur.Node.DOCUMENT_TYPE_NODE = 10;
	Fleur.Node.DOCUMENT_FRAGMENT_NODE = 11;
	Fleur.Node.NOTATION_NODE = 12;
	Fleur.Node.NAMESPACE_NODE = 129;
	Fleur.Node.ATOMIC_NODE = Fleur.Node.TEXT_NODE;
	Fleur.Node.SEQUENCE_NODE = 130;
	Fleur.Node.ARRAY_NODE = 131;
	Fleur.Node.MAP_NODE = 132;
	Fleur.Node.ENTRY_NODE = 133;

	Fleur.Serializer = function() {};
	Fleur.Serializer.escapeXML = function(s) {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	};
	Fleur.Serializer.prototype._serializeXMLToString = function(node, indent, offset, cdataSectionElements) {
		var s, i, l;
		switch (node.nodeType) {
			case Fleur.Node.ELEMENT_NODE:
				s = (indent ? offset + "\x3C" : "\x3C") + node.nodeName;
				if (indent) {
					var names = [];
					for (i = 0, l = node.attributes.length; i < l; i++) {
						names.push(node.attributes[i].nodeName);
					}
					names.sort();
					for (i = 0, l = names.length; i < l; i++) {
						s += " " + names[i] + "=\"" + Fleur.Serializer.escapeXML(node.getAttribute(names[i])).replace('"', "&quot;") + "\"";
					}
				} else {
					for (i = 0, l = node.attributes.length; i < l; i++) {
						s += " " + node.attributes[i].nodeName + "=\"" + Fleur.Serializer.escapeXML(node.attributes[i].nodeValue).replace('"', "&quot;") + "\"";
					}
				}
				if (node.childNodes.length === 0) {
					return s + (indent ? "/\x3E\n" : "/\x3E");
				}
				s += indent && (node.childNodes[0].nodeType !== Fleur.Node.TEXT_NODE || node.childNodes[0].data.match(/^[ \t\n\r]*$/)) ? "\x3E\n" : "\x3E";
				if (cdataSectionElements.indexOf(" " + node.nodeName + " ") !== -1) {
					for (i = 0, l = node.childNodes.length; i < l; i++) {
						if (node.childNodes[i].nodeType === Fleur.Node.TEXT_NODE) {
							s += "\x3C![CDATA[";
							s += node.childNodes[i].data;
							s += "]]\x3E";
						} else {
							s += this._serializeXMLToString(node.childNodes[i], indent, offset + "  ", cdataSectionElements);
						}
					}
				} else {
					for (i = 0, l = node.childNodes.length; i < l; i++) {
						s += this._serializeXMLToString(node.childNodes[i], indent, offset + "  ", cdataSectionElements);
					}
				}
				return s + (indent && (node.childNodes[0].nodeType !== Fleur.Node.TEXT_NODE || node.childNodes[0].data.match(/^[ \t\n\r]*$/)) ? offset + "\x3C/" : "\x3C/") + node.nodeName + (indent ? "\x3E\n" : "\x3E");
			case Fleur.Node.TEXT_NODE:
				if (indent && node.data.match(/^[ \t\n\r]*$/) && node.parentNode.childNodes.length !== 1) {
					return "";
				}
				return Fleur.Serializer.escapeXML(node.data);
			case Fleur.Node.CDATA_NODE:
				return (indent ? offset + "\x3C![CDATA[" : "\x3C![CDATA[") + node.data + (indent ? "]]\x3E\n" : "]]\x3E");
			case Fleur.Node.PROCESSING_INSTRUCTION_NODE:
				return (indent ? offset + "\x3C?" : "\x3C?") + node.nodeName + " " + node.nodeValue + (indent ? "?\x3E\n" : "?\x3E");
			case Fleur.Node.COMMENT_NODE:
				return (indent ? offset + "\x3C!--" : "\x3C!--") + node.data + (indent ? "--\x3E\n" : "--\x3E");
			case Fleur.Node.DOCUMENT_NODE:
				s = '\x3C?xml version="1.0" encoding="UTF-8"?\x3E\r\n';
				for (i = 0, l = node.childNodes.length; i < l; i++) {
					s += this._serializeXMLToString(node.childNodes[i], indent, offset, cdataSectionElements);
				}
				return s;
		}
	};

	Fleur.Serializer.prototype.serializeToString = function(node, mediatype, indent, cdataSectionElements) {
		var media = mediatype.split(";"), config = {}, param, paramreg = /^\s*(\S*)\s*=\s*(\S*)\s*$/, i = 1, l = media.length, ser;
		while (i < l) {
			param = paramreg.exec(media[i]);
			config[param[1]] = param[2];
			i++;
		}
		switch (media[0].replace(/^\s+|\s+$/gm,'')) {
			case "text/xml":
			case "application/xml":
				ser = this._serializeXMLToString(node, indent, "", " " + cdataSectionElements + " ");
				if (indent && ser.charAt(ser.length - 1) === "\n") {
					ser = ser.substr(0, ser.length - 1);
				}
				return ser;
		}
	};

	Fleur.XMLSerializer = function() {};
	Fleur.XMLSerializer.prototype = new Fleur.Serializer();
	Fleur.XMLSerializer.prototype.serializeToString = function(node, indent, cdataSectionElements) {
		return Fleur.Serializer.prototype.serializeToString.call(this, node, "application/xml", indent, cdataSectionElements);
	};

	})(typeof exports === 'undefined'? this.Fleur = {}: exports);
}