// In src/database/utils.js
const fs = require("fs");

const saveToDatabase = (DB) => {
  try {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error("Error saving to database:", error);
    throw { status: 500, message: "Failed to save data to the database" };
  }
};

module.exports = { saveToDatabase };
