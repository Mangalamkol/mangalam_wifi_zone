const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const testRouter = require("./test-router");

const app = express();
app.use(cors({ origin: true }));

app.use("/api", testRouter);

exports.api = functions.https.onRequest(app);