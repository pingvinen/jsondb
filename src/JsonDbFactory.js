define(['JsonDb','JsonDbTable','JsonDbRow','JsonDbColumn', 'UuidGenerator'], function(JsonDb, JsonDbTable, JsonDbRow, JsonDbColumn, uuidGenerator, undefined) {
	"use strict";

	function JsonDbFactory() {
	}

	/**
	 * @returns JsonDb
	 */
	JsonDbFactory.prototype.getDb = function() {
		return new JsonDb(this, uuidGenerator);
	}

	/**
	 * @returns JsonDbTable
	 */
	JsonDbFactory.prototype.getTable = function() {
		return new JsonDbTable();
	}

	/**
	 * @returns JsonDbRow
	 */
	JsonDbFactory.prototype.getRow = function() {
		return new JsonDbRow();
	}

	/**
	 * @param {string} Optional name
	 * @returns JsonDbColumn
	 */
	JsonDbFactory.prototype.getColumn = function(name) {
		var col = new JsonDbColumn();

		if (name) {
			col.setName(name);
		}

		return col;
	}


	return new JsonDbFactory();
});