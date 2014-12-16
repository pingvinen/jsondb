define([], function(undefined) {
	"use strict";

	/**
	 * @param {JsonDbFactory} jsonDbFactory
	 * @param {UuidGenerator} uuidGenerator
	 */
	function JsonDb(jsonDbFactory, uuidGenerator) {
		this.factory = jsonDbFactory;
		this.uuidGenerator = uuidGenerator;
		this.tables = {};
	}

	/**
	 * @param {string} name
	 * @param {string[]} columns
	 */
	JsonDb.prototype.addTable = function(name, columns) {
		var tbl = this.factory.getTable();
		tbl.setName(name);

		if (columns != null) {
			for (var i=0; i!=columns.length; i++) {
				tbl.addColumn(this.factory.getColumn(columns[i]));
			}
		}

		this.tables[name] = tbl;
	}

	JsonDb.prototype.addRow = function(tableName, object) {
		if (!this.tables[tableName]) {
			throw tableName + ' does not exist in this db';
		}

		var table = this.tables[tableName];
		var row = this.factory.getRow();

		var keys = Object.keys(object);
		for (var x in keys) {
			var key = keys[x];
			row.setValue(key, object[key]);
		}

		if (!row.hasId()) {
			row.setId(this.uuidGenerator.get());
		}

		table.addRow(row);
	};

	JsonDb.prototype.toHash = function() {
		var json = {
			tables: []
		};

		var keys = Object.keys(this.tables);
		for (var x in keys) {
			var key = keys[x];
			json.tables.push(this.tables[key].toHash());
		}


		return json;
	};


	JsonDb.prototype.toJson = function() {
		return JSON.stringify(this.toHash());
	};


	return JsonDb;
});