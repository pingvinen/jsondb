define([], function () {
	"use strict";

	/**
	 * Hack to make IE8 work with console.log
	 * even when the dev tools are closed.
	 * All hail the idiocy in Redmond
	 */
	if (typeof(console) === 'undefined') {
		window.console = {
			log: function() { }
		};
	}
});
