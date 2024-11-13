const { validateNationalID, extractData } = require('../services/idService');

const validateAndExtractID = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ valid: false, error: "ID is required" });
    }

    const validation = validateNationalID(id);
    if (validation.valid) {
        const data = extractData(id);
        return res.status(200).json({ valid: true, ...data });
    }

    return res.status(400).json({ valid: false, error: validation.error });
};

module.exports = { validateAndExtractID };
