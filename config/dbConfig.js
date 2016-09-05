/**
 * Created by xuyuhao on 16/8/28.
 */

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('FSE.db');

module.exports = db;
