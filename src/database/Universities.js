const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllUniversities = () => {
  try {
    return DB.universities;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneUniversity = (universityId) => {
  try {
    const university = DB.universities.find((uni) => uni.id === universityId);
    if (!university) {
      throw {
        status: 400,
        message: `Can't find university with the id '${universityId}'`,
      };
    }
    return university;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewUniversity = (newUniversity) => {
  try {
    const isAlreadyAdded =
      DB.universities.findIndex((uni) => uni.name === newUniversity.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `University with the name '${newUniversity.name}' already exists`,
      };
    }
    DB.universities.push(newUniversity);
    saveToDatabase(DB);
    return newUniversity;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneUniversity = (universityId, changes) => {
  try {
    const indexForUpdate = DB.universities.findIndex(
      (uni) => uni.id === universityId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find university with the id '${universityId}'`,
      };
    }
    const updatedUniversity = {
      ...DB.universities[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.universities[indexForUpdate] = updatedUniversity;
    saveToDatabase(DB);
    return updatedUniversity;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneUniversity = (universityId) => {
  try {
    const indexForDeletion = DB.universities.findIndex(
      (uni) => uni.id === universityId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find university with the id '${universityId}'`,
      };
    }
    DB.universities.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllUniversities,
  getOneUniversity,
  createNewUniversity,
  updateOneUniversity,
  deleteOneUniversity,
};
