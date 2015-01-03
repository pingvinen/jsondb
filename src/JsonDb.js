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

		if (!tbl.hasIdColumn()) {
			tbl.addColumn(this.factory.getColumn('_id'));
		}

		this.tables[name] = tbl;
	}

	/**
	 * @returns {JsonDbTable[]}
	 */
	JsonDb.prototype.getTables = function() {
		var result = [];

		var keys = Object.keys(this.tables);
		for (var x in keys) {
			var key = keys[x];
			result.push(this.tables[key].toHash());
		}

		return result;
	};

	/**
	 * @returns {JsonDbTable}
	 */
	JsonDb.prototype.getTable = function(name) {
		if (this.tables[name]) {
			return this.tables[name];
		}

		return null;
	};

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

	JsonDb.prototype.removeRow = function(tableName, rowId) {
		var table = this.getTable(tableName);
		if (table === null) {
			throw tableName + ' does not exist in this db';
		}

		table.removeRow(rowId);
	};

	JsonDb.prototype.updateRow = function(tableName, rowId, object) {
		var table = this.getTable(tableName);
		if (table === null) {
			throw tableName + ' does not exist in this db';
		}

		table.updateRow(rowId, object);
	};

	JsonDb.prototype.toHash = function() {
		return {
			tables: this.getTables()
		}
	};

	JsonDb.prototype.toJson = function() {
		return JSON.stringify(this.toHash());
	};

	JsonDb.prototype.load = function(json) {
		var hash = JSON.parse(json);

		if (hash.tables === undefined) {
			throw 'tables must be defined';
		}

		var entry = null;

		for (var x in hash.tables) {
			entry = hash.tables[x];

			this.addTable(entry.name, entry.columns);

			for (var y in entry.rows) {
				this.addRow(entry.name, entry.rows[y].values);
			}
		}
	};

	return JsonDb;
});