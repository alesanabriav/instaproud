'use strict';
var fs = require('fs-extra');
var sharp = require('sharp');
var createHash = require(__base + 'lib/createName');
var getPaths = require(__base + 'lib/get_paths');

module.exports = function compressImage(file, user, next) {
	var path = file.path;
	var userId = user._id;
	var folder = getPaths.folder(user);

	getPaths.file(user, path, '.jpeg', function(err, filename) {
		if(err) return next(err);

		fs.mkdirs(folder, function(err) {
			if(err) return next(err);

			sharp(__base + path)
			.quality(95)
			.resize(500)
			.toFile(folder + '/' + filename, function(err) {
				if (err) return next(err);
				fs.remove(__base + path, function (err) {
					if (err) return next(err);
					return next(null, 'images/' + userId + '/' + filename);
				});
			});

		});
	});

};
