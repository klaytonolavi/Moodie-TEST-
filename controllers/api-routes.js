var db = require("../models");
var base64ToImg = require('base64-to-image');
var fs = require("fs");
var https = require("https");
https.post = require("https-post");

module.exports = function(app) {
	var baseURL = "https://mooodie.herokuapp.com";

	// receives image and processes it, then sends link for face++ assessment
	app.post("/api/judge", function(req, res){
		// get image in base64
		var imageURI = req.body.face;
		var emotion = req.body.target;
	
		// convert image to JPEG and save
		var image = base64ToImg(imageURI, "public/temp/", {debug: true})
		console.log(image);
		var imageUrl = baseURL + "/temp/" + image.fileName;
	
		// send image link to face++ for evaluation
		var fppParams = {
			api_key: "6rH88UB11ggkHwhuljdWC0Bl0vujjUfs",
			api_secret: "gsKKbx40EBR2AbhWf4xVrX1wwAbzLAzU",
			return_attributes: "emotion",
			image_url: imageUrl
		};
		https.post("https://api-us.faceplusplus.com/facepp/v3/detect", fppParams, function(response){
			response.setEncoding('utf8');
			response.on('data', function(chunk) {
				// send json back to client
				var feedback = typeof chunk.faces !== 'undefined' ? {
					id: image.fileName,
					score: chunk.faces[0].attributes.emotion[emotion]
				} : {
					id: image.fileName,
					score: 0
				};
				res.send(feedback);
			});
		})
	});

	// save record for image and move to permanent url
	app.post("/api/save", function(req, res){
		// move the file somewhere more permanent
		var newName = new Date().getTime() + ".jpg";
		fs.rename("public/temp/" + req.body.id, "public/photos/" + newName, (err)=>{
			if(err) throw err;
			// create new database record for this image
			var query = {
				url: baseURL + "/gallery/" + newName,
				emotion: req.body.emotion,
				score: req.body.score
			};
			db.Gallery.create(query).then((result)=>{
				res.send(result);
			});
		})
	});
};
