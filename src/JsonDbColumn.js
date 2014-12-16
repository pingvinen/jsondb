define([], function(undefined) {
	"use strict";

	function JsonDbColumn() {
		this.name = '';
	}

	JsonDbColumn.prototype.setName = function(name) {
		this.name = name;
	};

	JsonDbColumn.prototype.getName = function() {
		return this.name;
	};

	JsonDbColumn.prototype.toHash = function() {
		return {
			name: this.getName()
		};
	};

	return JsonDbColumn;
});