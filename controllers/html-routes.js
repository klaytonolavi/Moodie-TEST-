var path = require("path");
var db = require("../models");

// Routes
module.exports = function(app) {

	// returns home/landing page
	app.get("/", function(req, res) {
		res.render("index");
	});

	// returns the gallery with option for emotion category
	app.get("/gallery/:emotion?", function(req, res) {
		var query = {
			where: {public: true},
			order: [["score", "DESC"]],
			limit: 16		
		};
		var data = {title: "Gallery"};
		var categories = ["sadness", "neutural", "disgust", "anger", "surprise", "fear", "happiness"];
		if( req.params.emotion && categories.includes(req.params.emotion) ){
			query.where.emotion = req.params.emotion;
			data.title = req.params.emotion.charAt(0).toUpperCase() + req.params.emotion.slice(1) + " Gallery";
		}
		db.Gallery.findAll(query).then((results)=>{
			data.photos = results;
			res.render("gallery", data);			
		});
	});

	// returns the game page!
	app.get("/play", function(req, res) {
		res.render("game");
	});
};