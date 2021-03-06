
mongodb = require 'mongodb'
node_util = require 'util'
smio = global.smoothio

class smio.Database

	constructor: (@inst, @mongo, @name, @title, interval) ->
		@db = new mongodb.Db(@name, @mongo, strict: false, native_parser: false)
		if interval
			fn = =>
				@connect (err, db) => smio.logit(@inst.r(smio.iif(err, 'log_mongo_error_dbnoconnect', 'log_mongo_dbconnected'), @title, if err then @inst.formatError(err) else ''), 'mongodb.' + @name)
			setTimeout(fn, interval)

	connect: (func) ->
		if @db.state is 'connected'
			func(null, @db)
		else
			@db.open (err, db) => func(err, db)
		@db

	withCollection: (name, cb) ->
		@connect (err, db) ->
			return cb(err) if err
			db.createCollection(name, cb)

