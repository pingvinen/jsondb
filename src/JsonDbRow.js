define([], function(undefined) {
	"use strict";

	function JsonDbRow() {
		this.values = {};
	}

	JsonDbRow.prototype.getId = function() {
		return this.getValue('_id');
	}

	JsonDbRow.prototype.setId = function(id) {
		this.setValue('_id', id);
	}

	JsonDbRow.prototype.hasId = function () {
		return this.getId() !== null;
	}

	JsonDbRow.prototype.setValue = function(columnName, value) {
		this.values[columnName] = value;
	};

	JsonDbRow.prototype.getValue = function(columnName) {
		if (this.values[columnName]) {
			return this.values[columnName];
		}

		return null;
	};

	JsonDbRow.prototype.toHash = function() {
		return {
			values: this.values
		};
	};


	return JsonDbRow;
});