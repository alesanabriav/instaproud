'use strict';
var fs = require('fs-extra');
var sharp = require('sharp');
var createHash = require(__base + 'lib/createName');
var getPaths = require(__base + 'lib/get_paths');

module.exports = function compressImage(file, user, next) {
	var path = file.path;
	var userId = user._id;
	var folder = getPaths.folder(user);
	var image;
	var rotate = 0;
	getPaths.file(user, path, ".jpeg", function(err, filename) {
		if(err) return next(err);

		fs.mkdirs(folder, function(err) {
			if(err) return next(err);
			image = sharp(__base + path);
			image.metadata(function(err, metadata)

				if (metadata.orientation === '-90') {
					rotate = 90;
				} else if (metadata.orientation === '90') {
					rotate = -90;
				}

				image
				.rotate(rotate)
				.resize(500)
				.toFile(folder + "/" + filename, function(err) {
					if (err) return next(err);
					return next(null, "images/" + userId + "/" + filename);
				});
			});

		});
	});

}