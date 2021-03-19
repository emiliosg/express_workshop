const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');
const bodyParser =  require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req, res, next) => {
	res.send("Bienvenido al pokedex");
});

app.post("/pokemon",(req, res, next) => {
	return res.status(200).send(req.body);
});
app.get("/pokemon",(req,res,next) => {
	res.status(200).send(pokemon);
});
app.post("/pokemon",(req, res, next) =>{
	return res.status(200).send("Estas en pokemon POST");
});

app.get("/pokemon/:id([0-9]{1,3})",(req,res,next) => {
	const id = req.params.id -1;
	if(id >= 0 && id <= 150)
	{
		return res.status(200).send(pokemon[req.params.id - 1]);
	}
	return res.status(404).send("Pokemon no encontrado");
});

app.get("/pokemon/:name([A-Za-z]+)",(req,res,next) => {
	const name = req.params.name;
	const pk  = pokemon.filter((p) => {
		return (p.name.toUpperCase() == name.toUpperCase()) && p;
	});
	if(pk.length > 0) {
		return res.status(200).send(pk);
	}
	return res.status(404).send("Pokemon no encontrado");
jkjkdsf

});

app.listen(process.env.PORT || 3000,() => {
	console.log("Server is up...");
});
