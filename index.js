const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

const base = "https://pokeapi.co/api/v2/pokemon";

app.use(cors());

app.get("/images/pokemons", async (req, res) => {
  const { name, imageType = "front_default" } = req.query;

  if (!name) {
    return res.status(400).send({
      error: "name is required"
    });
  }

  if (
    imageType !== "front_default" &&
    imageType !== "back_default" &&
    imageType !== "front_shiny"
  ) {
    return res.status(400).send({
      error: "imageType not allowed"
    });
  }

  const url = `${base}/${name}`;

  let pokemon = null;
  try {
    pokemon = await axios(url);
  } catch (exception) {
    if (exception.response.status == 404) {
      return res.status(404).send({
        error: `Pokemon ${name} not found`
      });
    }

    return res.status(500).send({
      error: `oops`
    });
  }

  const { sprites } = pokemon.data;

  res.send({
    image: sprites.front_default
  });
});

const port = 4000;
app.listen(port);

console.log("Listening on localhost:" + port);
