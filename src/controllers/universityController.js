const universityService = require("../services/universityService");

const getAllUniversities = (req, res) => {
  const { limit, offset, all } = req.query;

  try {
    let universities;
    if (all === "true") {
      // Bypass pagination logic and fetch all universities
      universities = universityService.getAllUniversitiesWithoutPagination();
    } else {
      // Default pagination logic when all is not set to true
      const paginationLimit = parseInt(limit) || 10;
      const paginationOffset = parseInt(offset) || 0;
      universities = universityService.getAllUniversities(paginationLimit, paginationOffset);
    }

    res.send({ status: "OK", data: universities });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getOneUniversity = (req, res) => {
  const {
    params: { universityId },
  } = req;
  if (!universityId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':universityId' cannot be empty" },
    });
    return;
  }
  try {
    const university = universityService.getOneUniversity(universityId);
    res.send({ status: "OK", data: university });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewUniversity = (req, res) => {
  const { body } = req;
  if (!body.name || !body.location || !body.courses) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or empty in the request body: 'name', 'location', 'courses'",
      },
    });
    return;
  }
  const newUniversity = {
    name: body.name,
    location: body.location,
    courses: body.courses,
  };
  try {
    const createdUniversity = universityService.createNewUniversity(newUniversity);
    res.status(201).send({ status: "OK", data: createdUniversity });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneUniversity = (req, res) => {
  const {
    body,
    params: { universityId },
  } = req;
  if (!universityId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':universityId' cannot be empty" },
    });
    return;
  }
  try {
    const updatedUniversity = universityService.updateOneUniversity(universityId, body);
    res.send({ status: "OK", data: updatedUniversity });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneUniversity = (req, res) => {
  const {
    params: { universityId },
  } = req;
  if (!universityId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':universityId' cannot be empty" },
    });
    return;
  }
  try {
    universityService.deleteOneUniversity(universityId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getUniversitiesByLocation = (req, res) => {
  const { location } = req.query;
  if (!location) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Query parameter 'location' is required" },
    });
    return;
  }
  try {
    const universities = universityService.getUniversitiesByLocation(location);
    res.send({ status: "OK", data: universities });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getUniversitiesByCourse = (req, res) => {
  const { course } = req.query;
  if (!course) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Query parameter 'course' is required" },
    });
    return;
  }
  try {
    const universities = universityService.getUniversitiesByCourse(course);
    res.send({ status: "OK", data: universities });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getUniversityByName = (req, res) => {
  const {
    params: { universityName },
  } = req;
  if (!universityName) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':universityName' cannot be empty" },
    });
    return;
  }
  try {
    const university = universityService.getUniversityByName(universityName);
    res.send({ status: "OK", data: university });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
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
};

