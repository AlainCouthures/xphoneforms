/*eslint-env browser*/
/*globals XsltForms_engine XsltForms_browser XsltForms_control XsltForms_schema XsltForms_xmlevents*/
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module select
 * @description  === "XsltForms_select" class ===
 * Select/Select1 Control  Class
 * * constructor function : initializes specific properties and initializes focus and change event management
 */
		
function XsltForms_select(subform, id, min, max, full, binding, incremental, clone) {
	XsltForms_engine.counters.select++;
	this.init(subform, id);
	this.controlName = max === 1 ? "select1": "select";
	this.binding = binding;
	this.min = min;
	this.max = max;
	this.full = full;
	this.incremental = incremental;
	this.isClone = clone;
	this.hasBinding = true;
	this.outRange = false;
	if (!this.full) {
		this.select = XsltForms_browser.isXhtml ? this.element.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "select")[0] : this.element.getElementsByTagName("select")[0];
		this.initFocus(this.select);
		if (incremental) {
			XsltForms_browser.events.attach(this.select, "change", XsltForms_select.incrementalChange);
			XsltForms_browser.events.attach(this.select, "keyup", XsltForms_select.incrementalChangeKeyup);
		} else {
			XsltForms_browser.events.attach(this.select, "change", XsltForms_select.normalChange);
		}
	}
}

//XsltForms_select.prototype = new XsltForms_control();


		
/**
 * * '''clone''' method : creates a new select/select1 control with the given id
 */

XsltForms_select.prototype.clone = function(id) { 
	return new XsltForms_select(this.subform, id, this.min, this.max, this.full, this.binding, this.incremental, true);
};


		
/**
 * * '''dispose''' method : clears properties of this select/select1 control and calls the parent dispose() method
 */

XsltForms_select.prototype.dispose = function() {
	this.select = null;
	this.selectedOptions = null;
	XsltForms_engine.counters.select--;
	XsltForms_control.prototype.dispose.call(this);
};


		
/**
 * * '''focusFirst''' method : sets focus to the first item in this select/select1 control
 */

XsltForms_select.prototype.focusFirst = function() {
	var input = XsltForms_browser.isXhtml ? this.element.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "input")[0] : this.element.getElementsByTagName("input")[0];
	input.focus();
	if (XsltForms_browser.isOpera) {
		input.focus();
	}
};


		
/**
 * * '''setValue''' method : searches for the given value and checks it if found or dispatches the "xforms-in-range" event
 */

XsltForms_select.prototype.setValue = function(value) {
	var optvalue;
	if (!this.full && (!value || value === "")) {
		this.selectedOptions = [];
		if (this.select.options[0] && this.select.options[0].value !== "\xA0") {
			var empty = XsltForms_browser.isXhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "option") : document.createElement("option");
			empty.value = "\xA0";
			empty.text = "\xA0";
			empty.id = "";
			if (this.select.children[0]) {
				this.select.insertBefore(empty, this.select.children[0]);
			} else {
				this.select.appendChild(empty);
			}
			this.select.selectedIndex = 0;
		}
	} else {
		if (!this.full && this.select.firstChild && this.select.firstChild.value === "\xA0" && !(this.min === 0 && this.max === 1)) {
			//this.select.removeChild(this.select.firstChild);
			this.select.remove(0);
		}
		var vals = value ? value instanceof Array ? value : (this.max !== 1? value.split(XsltForms_engine.valuesSeparator) : [value]) : [""];
		var list = this.full ? (XsltForms_browser.isXhtml ? this.element.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "input") : this.element.getElementsByTagName("input")) : this.select.options;
		var well = true;
		var schtyp = XsltForms_schema.getType(XsltForms_browser.getType(this.element.node) || "xsd_:string");
		for (var i = 0, len = vals.length; well && i < len; i++) {
			var val = vals[i];
			var found = false;
			for (var j = 0, len1 = list.length; !found && j < len1; j++) {
				optvalue = list[j].value;
				if (schtyp.format) {
					try { optvalue = schtyp.format(optvalue); } catch(e) { }
				}
				if (optvalue === val) {
					found = true;
				}
			}
			well = found;
		}
		if (well || (this.max !== 1 && !value)) {
			if (this.outRange) {
				this.outRange = false;
				XsltForms_xmlevents.dispatch(this, "xforms-in-range");
			}
		} else if ((this.max === 1 || value) && !this.outRange) {
			this.outRange = true;
			XsltForms_xmlevents.dispatch(this, "xforms-out-of-range");
		}
		vals = this.max !== 1? vals : [vals[0]];
		var item;
		if (this.full) {
			for (var n = 0, len2 = list.length; n < len2; n++) {
				item = list[n];
				item.checked = item.value !== "" ? XsltForms_browser.inArray(item.value, vals) : false;
			}
		} else {
			this.selectedOptions = [];
			for (var k = 0, len3 = list.length; k < len3; k++) {
				item = list[k];
				optvalue = item.value;
				if (schtyp.format) {
					try { optvalue = schtyp.format(optvalue); } catch(e) { }
				}
				var b = XsltForms_browser.inArray(optvalue, vals);
				if (b) {
					this.selectedOptions.push(item);
				}
				try {
					item.selected = b;
				} catch(e) {
				}
			}
		}
	}
};


		
/**
 * * '''changeReadonly''' method : changes the read only state of this select/select1 control
 */

XsltForms_select.prototype.changeReadonly = function() {
	if (this.full) {
		var list = XsltForms_browser.isXhtml ? this.element.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "input") : this.element.getElementsByTagName("input");
		for (var i = 0, len = list.length; i < len; i++) {
			list[i].disabled = this.readonly;
		}
	} else {
		if (!XsltForms_browser.dialog.knownSelect(this.select)) {
			this.select.disabled = this.readonly;
		}
	}
};


		
/**
 * * '''itemClick''' method : dispatches "xforms-select" and "xforms-deselect" events
 */

XsltForms_select.prototype.itemClick = function(value) {
	var inputs = XsltForms_browser.isXhtml ? this.element.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "input") : this.element.getElementsByTagName("input");
	var input;
	XsltForms_engine.openAction("XsltForms_select.prototype.itemClick");
	if (this.max !== 1) {
		var newValue = null;
		for (var i = 0, len = inputs.length; i < len; i++) {
			input = inputs[i];
			if (input.value === value) {
				XsltForms_xmlevents.dispatch(input.parentNode, input.checked? "xforms-select" : "xforms-deselect");
			}
			if (input.checked) {
				newValue = (newValue ? newValue + XsltForms_engine.valuesSeparator : "") + input.value;
			}
		}
		value = newValue;
	} else {
		var old = this.value;
		var schtyp = XsltForms_schema.getType(XsltForms_browser.getType(this.element.node) || "xsd_:string");
		if (!old) {
			old = XsltForms_browser.getValue(this.element.node);
			if (schtyp.format) {
				try { old = schtyp.format(old); } catch(e) { }
			}
		}
		var inputSelected = null;
		if (old === value && this.min !== 0) {
			XsltForms_engine.closeAction("XsltForms_select.prototype.itemClick");
			return;
		}
		for (var j = 0, len1 = inputs.length; j < len1; j++) {
			input = inputs[j];
			var input_controlvalue = input.value;
			if (schtyp.format) {
				try { input_controlvalue = schtyp.format(input_controlvalue); } catch(e) { }
			}
			input.checked = input_controlvalue === value;
			if (input_controlvalue === old) {
				if (input.checked && this.min === 0) {
					input.checked = false;
					value = "";
				}
				XsltForms_xmlevents.dispatch(input.parentNode, "xforms-deselect");
			} else if (input_controlvalue === value) {
				inputSelected = input;
			}
		}
		if (inputSelected) {
			XsltForms_xmlevents.dispatch(inputSelected.parentNode, "xforms-select");
		}
	}
	if (this.incremental) {
		this.valueChanged(value || "");
	} else {
		this.value = value || "";
	}
	XsltForms_engine.closeAction("XsltForms_select.prototype.itemClick");
};


		
/**
 * * '''blur''' method : blur event management
 * @callback
 */

XsltForms_select.prototype.blur = function(evt) {
	if (this.value) {
		XsltForms_engine.openAction("XsltForms_select.prototype.blur");
		this.valueChanged(this.value);
		XsltForms_engine.closeAction("XsltForms_select.prototype.blur");
		this.value = null;
	}
};


		
/**
 * * '''normalChange''' function : handler for normal mode on change dispatching "xforms-select" and "xforms-deselect" events
 * @callback
 */

XsltForms_select.normalChange = function(evt) {
	var xf = XsltForms_control.getXFElement(this);
	var news = [];
	var value = "";
	var copy = [];
	var old = xf.getSelected();
	var opts = this.options;
	XsltForms_engine.openAction("XsltForms_select.normalChange");
	for (var i = 0, len = old.length; i < len; i++) {
		if (old[i].selected) {
			news.push(old[i]);
		} else {
			XsltForms_xmlevents.dispatch(old[i], "xforms-deselect");
		}
	}
	var opt;
	for (var j = 0, len1 = opts.length; j < len1; j++) {
		opt = opts[j];
		if (opt.selected) {
			if (opt.copy) {
				copy.push(opt.copy);
			} else if (opt.value !== "\xA0") {
				value = value? value + XsltForms_engine.valuesSeparator + opt.value : opt.value;
			}
		}
	}
	for (var k = 0, len2 = opts.length; k < len2; k++) {
		opt = opts[k];
		if (opt.selected && opt.value !== "\xA0") {
			if (!XsltForms_browser.inArray(opt, news)) {
				news.push(opt);
				XsltForms_xmlevents.dispatch(opt, "xforms-select");
			}
		}
	}
	if (copy.length === 0) {
		xf.value = value;
		var schtyp = XsltForms_schema.getType(XsltForms_browser.getType(xf.element.node) || "xsd_:string");
		if (schtyp.format) {
			try { xf.value = schtyp.format(value); } catch(e) { }
		}
	} else {
		xf.value = copy;
	}
	xf.selectedOptions = news;
	XsltForms_engine.closeAction("XsltForms_select.normalChange");
};


		
/**
 * * '''incrementalChange''' function : handler for incremental mode on change calling normal mode handler
 */

XsltForms_select.incrementalChange = function(evt) {
	var xf = XsltForms_control.getXFElement(this);
	XsltForms_engine.openAction("XsltForms_select.incrementalChange");
	XsltForms_select.normalChange.call(this, evt);
	xf.valueChanged(xf.value);
	XsltForms_engine.closeAction("XsltForms_select.incrementalChange");
};


		
/**
 * * '''incrementalChangeKeyup''' function : handler for incremental mode from keyboard on change calling normal mode handler
 */

XsltForms_select.incrementalChangeKeyup = function(evt) {
	if (evt.keyCode !== 9 && evt.keyCode !== 17) {
		var xf = XsltForms_control.getXFElement(this);
		XsltForms_engine.openAction("XsltForms_select.incrementalChangeKeyup");
		XsltForms_select.normalChange.call(this, evt);
		xf.valueChanged(xf.value);
		XsltForms_engine.closeAction("XsltForms_select.incrementalChangeKeyup");
	}
};


		
/**
 * * '''getSelected''' method : collects selected options for this select/select1 control
 */

XsltForms_select.prototype.getSelected = function() {
	var s = this.selectedOptions;
	if (!s) {
		s = [];
		var opts = this.select.options;
		for (var i = 0, len = opts.length; i < len; i++) {
			if (opts[i].selected) {
				s.push(opts[i]);
			}
		}
	}
	return s;
};