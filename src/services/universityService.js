const { v4: uuid } = require("uuid");
const University = require("../database/Universities");


const paginate = (array, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return array.slice(startIndex, endIndex);
};

const getAllUniversities = (limit, offset) => {
  try {
    const allUniversities = University.getAllUniversities();
    const paginatedUniversities = allUniversities.slice(offset, offset + limit);

    return {
      data: paginatedUniversities,
      currentPage: {
        limit,
        offset,
      },
      totalPages: Math.ceil(allUniversities.length / limit),
      totalItems: allUniversities.length,
    };
  } catch (error) {
    throw error;
  }
};

const getAllUniversitiesWithoutPagination = () => {
  try {
    // Fetch all universities without applying limit/offset
    const allUniversities = University.getAllUniversities();  // Assume this fetches all
    return allUniversities;
  } catch (error) {
    throw error;
  }
};

const getOneUniversity = (universityId) => {
  try {
    const university = University.getOneUniversity(universityId);
    return university;
  } catch (error) {
    throw error;
  }
};

const createNewUniversity = (newUniversity) => {
  const universityToInsert = {
    ...newUniversity,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdUniversity = University.createNewUniversity(universityToInsert);
    return createdUniversity;
  } catch (error) {
    throw error;
  }
};

const updateOneUniversity = (universityId, changes) => {
  try {
    const updatedUniversity = University.updateOneUniversity(universityId, changes);
    return updatedUniversity;
  } catch (error) {
    throw error;
  }
};

const deleteOneUniversity = (universityId) => {
  try {
    University.deleteOneUniversity(universityId);
  } catch (error) {
    throw error;
  }
};

const getUniversitiesByLocation = (location) => {
  try {
    const universities = University.getAllUniversities().filter(
      (uni) => uni.location.toLowerCase() === location.toLowerCase()
    );
    if (universities.length === 0) {
      throw {
        status: 404,
        message: `No universities found in location '${location}'`,
      };
    }
    return universities;
  } catch (error) {
    throw error;
  }
};

const getUniversitiesByCourse = (course) => {
  try {
    const universities = University.getAllUniversities().filter((uni) =>
      uni.courses.some((c) => c.name.toLowerCase() === course.toLowerCase())
    );

    if (universities.length === 0) {
      throw {
        status: 404,
        message: `No universities found offering course '${course}'`,
      };
    }
    return universities;
  } catch (error) {
    throw error;
  }
};

const getUniversityByName = (universityName) => {
  try {
    const universities = University.getAllUniversities().filter((uni) =>
      uni.name.toLowerCase().includes(universityName.toLowerCase())
    );

    if (universities.length === 0) {
      throw {
        status: 404,
        message: `No university found with the name '${universityName}'`,
      };
    }
    return universities;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  getAllUniversities,
  getOneUniversity,
  createNewUniversity,
  updateOneUniversity,
  deleteOneUniversity,
  getUniversitiesByLocation, 
  getUniversitiesByCourse, 
  getUniversityByName,
  getAllUniversitiesWithoutPagination,
};


