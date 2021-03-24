const express = require('express');
const pokemon = express.Router();

const db = require('../config/database');

pokemon.post("/",(req, res, next) => {
	return res.status(200).send(req.body);
});
pokemon.get("/", async (req,res,next) => {
	const pkmn = await db.query("SELECT * FROM pokemon");
	res.status(200).send(pkmn);
});
pokemon.post("/pokemon",(req, res, next) =>{
	return res.status(200).send("Estas en pokemon POST");
});

pokemon.get("/:id([0-9]{1,3})", async (req,res,next) => {
	const id = req.params.id ;
	if(id >= 0 && id <= 500)
	{
		const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id);
		return res.status(200).send(pkmn);
	}
	return res.status(404).send("Pokemon no encontrado");
});

pokemon.get("/:name([A-Za-z]+)", async (req,res,next) => {
	const name = req.params.name;
		const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"'");
	if(pkmn.length > 0) {
		return res.status(200).send(pkmn);
	}
	return res.status(404).send("Pokemon no encontrado");

});

module.exports = pokemon;
