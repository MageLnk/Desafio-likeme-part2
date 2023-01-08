const express = require("express");
const cors = require("cors");
require("dotenv").config();
// Basic starting points
const app = express();
const PORT = 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Tools
const { getPosts, newPost, addNewLike, deletePost } = require("./controllers/consults");
// Load page
app.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/public/index.html`);
});
// App
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json({ msg: "Something weird happen :c", errorDetail: error });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.titulo) {
      res.status(400).json({ msg: "Missing basic information", errorDetail: error });
      return;
    }
    // Decidí poner un validador de al menos titulo como requisito obligatorio
    const { rowCount } = await newPost(payload);
    if (rowCount != 0) {
      res.status(200).send({ msg: "Todo perfecto" });
      return;
    }
  } catch (error) {
    res.status(500).json({ msg: "Something weird happen :c", errorDetail: error });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { rowCount } = await addNewLike(req.params);
    if (rowCount === 0) {
      res
        .status(204)
        .send({ msg: "Ha ocurrido un error en el servidor. Posiblemente la ID no exista. Inténtelo nuevamente" });
      return;
    }
    res.status(200).send({ msg: "Todo perfecto" });
  } catch (error) {
    res.status(500).json({ msg: "Something weird happen :c", errorDetail: error });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { rowCount } = await deletePost(req.params);
    if (rowCount != 1) {
      res
        .status(204)
        .send({ msg: "Ha ocurrido un error en el servidor. Posiblemente la ID no exista. Inténtelo nuevamente" });
      return;
    }
    res.status(200).send({ msg: "Todo perfecto" });
  } catch (error) {
    res.status(500).json({ msg: "Something weird happen :c", errorDetail: error });
  }
});

// Listener
app.listen(PORT, () => {
  console.log(`Server runing on port: htttp://localhost:${PORT}. Everything is fine`);
});
