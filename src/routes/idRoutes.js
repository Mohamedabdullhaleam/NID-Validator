const express = require('express');
const { validateAndExtractID } = require('../controllers/idController');
const router = express.Router();

router.post('/nid/validate', validateAndExtractID);

module.exports = router;

/**
 * @swagger
 * /api/nid/validate:
 *   post:
 *     summary: Validate and extract data from an Egyptian National ID
 *     description: Takes an ID and returns validation status, birth date, gender, and governorate.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The 14-digit Egyptian National ID.
 *                 example: "29804180102356"
 *     responses:
 *       200:
 *         description: ID is valid and data extracted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 birthDate:
 *                   type: string
 *                   description: Birth date in YYYY-MM-DD format.
 *                 gender:
 *                   type: string
 *                   description: Gender (Male/Female).
 *                 governorate:
 *                   type: string
 *                   description: Governorate based on ID.
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: Error message for invalid ID.
 */
