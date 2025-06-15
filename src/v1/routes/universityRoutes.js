const express = require("express");
const apicache = require("apicache");
const universityController = require("../../controllers/universityController");
const authenticateJWT = require("../../middleware/authMiddleware");

const router = express.Router();
const cache = apicache.middleware;

/**
 * @swagger
 * /universities:
 *   get:
 *     summary: Retrieve a list of universities
 *     description: Fetch paginated list of universities. Use query parameters to paginate.
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Maximum number of results per page
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Number of results to skip
 *       - in: query
 *         name: fetchAll
 *         required: false
 *         schema:
 *           type: boolean
 *           example: false
 *         description: Set to true to fetch all universities without pagination
 *     responses:
 *       200:
 *         description: List of universities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           location:
 *                             type: string
 *                 currentPage:
 *                   type: object
 *                   properties:
 *                     limit:
 *                       type: integer
 *                     offset:
 *                       type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 */
router.get("/", cache("2 minutes"), universityController.getAllUniversities);

router.get("/by-location", universityController.getUniversitiesByLocation);

router.get("/by-course", universityController.getUniversitiesByCourse);

router.get(
  "/by-name/:universityName",
  universityController.getUniversityByName
);

router.get("/:universityId", universityController.getOneUniversity);

router.post("/", authenticateJWT, universityController.createNewUniversity);

router.patch(
  "/:universityId",
  authenticateJWT,
  universityController.updateOneUniversity
);

router.delete(
  "/:universityId",
  authenticateJWT,
  universityController.deleteOneUniversity
);

module.exports = router;
