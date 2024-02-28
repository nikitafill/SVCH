const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const port = 3000;
const dataFilePath = path.join(__dirname, "products.json");
let productsData = require("./products.json");

app.get("/api/products", (req, res) => {
  res.json(productsData);
});

app.post("/api/products", (req, res) => {
  res.json(productsData);
});

app.post("/api/products/add", (req, res) => { 
  const newProduct = req.body;
  newProduct.id = productsData.length + 1;
  productsData.push(newProduct);

  fs.writeFile(
    "./products.json",
    JSON.stringify(productsData, null, 2),
    "utf8"
  );

  res.json({
    message: "Product added successfully",
    product: newProduct,
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/formattedData", async (req, res) => {
  try {
    const rawData = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(rawData);
    const acceptHeader = req.get("Accept");

    if (acceptHeader.includes("text/html")) {
      const htmlResponse = data
        .map(
          (product) =>
            `<div>ID: ${product.id}, Name: ${product.name}, Type: ${product.type}, Language: ${product.language}</div>`
        )
        .join("");
      res.send(htmlResponse);
    } else if (acceptHeader.includes("application/xml")) {
      const xmlResponse = `<data>${data
        .map(
          (product) =>
            `<product><id>${product.id}</id><name>${product.name}</name><type>${product.type}</type><language>${product.language}</language></product>`
        )
        .join("")}</data>`;
      res.type("application/xml");
      res.send(xmlResponse);
    } else {
      res.json(rawData);
    }
  } catch (error) {
    console.error("Error reading or parsing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });