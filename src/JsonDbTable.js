define([], function(undefined) {
	"use strict";

	function JsonDbTable() {
		this.name = '';
		this.columns = {};
		this.rows = [];
	}

	JsonDbTable.prototype.setName = function(name) {
		this.name = name;
	};

	JsonDbTable.prototype.getName = function() {
		return this.name;
	};

	/**
	 * @param {JsonDbColumn} column
	 */
	JsonDbTable.prototype.addColumn = function(column) {
		this.columns[column.getName()] = column;
	};

	/**
	 * @param {JsonDbRow} row
	 */
	JsonDbTable.prototype.addRow = function(row) {
		this.rows.push(row);
	};

	JsonDbTable.prototype.toHash = function() {
		var json = {
			  name: this.getName
			, columns: []
			, rows: []
		};

		var keys = Object.keys(this.columns);
		for (var x in keys) {
			var key = keys[x];
			json.columns.push(this.columns[key].toHash());
		}

		for (var i=0; i!=this.rows.length; i++) {
			json.rows.push(this.rows[i].toHash());
		}

		return json;
	};


	return JsonDbTable;
});