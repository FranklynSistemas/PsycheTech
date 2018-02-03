// check out https://github.com/visionmedia/node-pwd

/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var sup_iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

exports.hash = function(pwd, ite_salt, fn) {
	var iterations = sup_iterations;

	if (3 === arguments.length) {
		var salt = ite_salt.split(':');
		if (salt.length === 2) {
			iterations = salt[0];
			salt = salt[1];
		} else {
			salt = salt[0];
		}
		crypto.pbkdf2(pwd, salt, parseInt(iterations), len, function(err, hash) {
			fn(err, (new Buffer(hash, 'binary')).toString('base64'));
		});
	} else {
		fn = ite_salt;
		crypto.randomBytes(len, function(err, salt) {
			if (err) return fn(err);
			salt = salt.toString('base64');
			crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash) {
				if (err) return fn(err);
				fn(null, (new Buffer(hash, 'binary')).toString('base64'), iterations + ':' + salt);
			});
		});
	}
};
