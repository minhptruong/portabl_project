import express from "express";
var app = express();

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import { signer }  from "./sign_document.js";
import { derive_proof } from "./derive_proof.js";
import { verify_proof } from "./verify_proof.js";

import { DataStore } from "./data_store.js";

var verifier_data = new DataStore();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.post("/sign", async (req, res, next) => { 
	console.log("calling /sign");

	var signedDocument = await signer(req.body);
	var doc = JSON.stringify(signedDocument, null, 2);

	res.json(signedDocument);
});

app.post("/derive_proof", async (req, res, next) => {
	console.log("calling /derive_proof");

 	var results = await derive_proof(req.body);

 	res.json(results);
});

app.post("/verify", async (req, res, next) => {
	console.log("calling /verify");

 	var results = await verify_proof(req.body);
 	verifier_data.addData(results);

 	res.json(results);
});

app.post("/query", async (req, res, next) => {
	console.log("calling /query");

	var start = req.body.start;
	var end = req.body.end;

	var results = verifier_data.getDataRange(start, end);

	res.json(results);
});