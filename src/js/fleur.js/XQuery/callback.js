/*eslint-env browser, node*/
/*globals Fleur */
"use strict";
/**
 * @author Alain Couthures <alain.couthures@agencexml.com>
 * @licence LGPL - See file 'LICENSE.md' in this project.
 * @module 
 * @description 
 */
Fleur.callback_period = 500;
Fleur.callback_counter = 0;
Fleur.callback = function(cb) {
	if (Fleur.callback_counter === 0) {
		Fleur.callback_counter = Fleur.callback_period;
		//setAsap(cb);
		setImmediate(cb);
		return;
	}
	Fleur.callback_counter--;
	cb();
};