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

	JsonDbTable.prototype.removeRow = function(rowId) {
		for (var x in this.rows) {
			if (this.rows[x].getId() == rowId) {
				this.rows.splice(x, 1);
				return;
			}
		}
	};

	/**
	 * @returns {JsonDbColumn[]}
	 */
	JsonDbTable.prototype.getColumns = function() {
		var result = [];

		var keys = Object.keys(this.columns);
		for (var x in keys) {
			var key = keys[x];
			result.push(this.columns[key]);
		}

		return result;
	};

	/**
	 * @returns {JsonDbRow[]}
	 */
	JsonDbTable.prototype.getRows = function() {
		return this.rows;
	};

	JsonDbTable.prototype.hasIdColumn = function() {
		if (this.columns['_id']) {
			return true;
		}

		return false;
	};

	JsonDbTable.prototype.toHash = function() {
		var json = {
			  name: this.getName()
			, columns: this.getColumns()
			, rows: []
		};

		for (var i=0; i!=this.rows.length; i++) {
			json.rows.push(this.rows[i].toHash());
		}

		return json;
	};


	return JsonDbTable;
});