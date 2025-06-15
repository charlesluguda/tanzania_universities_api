const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");

const v1UniversityRouter = require("./v1/routes/universityRoutes");
const swaggerDocs = require("./v1/routes/swaggerConfig");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("password", 8),
    role: "admin",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordValid = bcrypt.compareSync(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.use(bodyParser.json());
app.use("/api/v1/universities", v1UniversityRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
