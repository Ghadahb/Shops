const express = require("express");
const connectDB = require("./db/database");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const app = express();
const path = require("path");

// Routes
const productRoutes = require("./apis/products/routes");
const shopRoutes = require("./apis/shop/shops.routes");

app.use(cors());

connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

// Routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);


console.log(path.join(__dirname, "media"));


app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
