
const governorateCodes = {
    "01": "Cairo",
    "02": "Alexandria",
    "03": "Port Said",
    "04": "Suez",
    "11": "Damietta",
    "12": "Dakahlia",
    "13": "Sharqia",
    "14": "Kalyubia",
    "15": "Kafr El Sheikh",
    "16": "Gharbia",
    "17": "Monufia",
    "18": "Beheira",
    "19": "Ismailia",
    "21": "Giza",
    "22": "Beni Suef",
    "23": "Fayoum",
    "24": "Minya",
    "25": "Asyut",
    "26": "Sohag",
    "27": "Qena",
    "28": "Aswan",
    "29": "Luxor",
    "31": "Red Sea",
    "32": "New Valley",
    "33": "Matrouh",
    "34": "North Sinai",
    "35": "South Sinai",
    "88": "Born Abroad"
};

function validateNationalID(id) {
    console.log(`Validating ID: ${id}`);  // Log the incoming ID for debugging

    const idRegex = /^\d{14}$/;
    if (!idRegex.test(id)) {
        console.log("ID failed validation: must be exactly 14 digits and numeric.");
        return { valid: false, error: "ID must be exactly 14 digits" };
    }

    const centuryCode = id[0];
    const year = parseInt(centuryCode === "2" ? "19" + id.slice(1, 3) : "20" + id.slice(1, 3), 10);
    const month = parseInt(id.slice(3, 5), 10);
    const day = parseInt(id.slice(5, 7), 10);

    if (!isValidDate(year, month, day)) {
        console.log("ID failed validation: Invalid birth date.");
        return { valid: false, error: "Invalid birth date" };
    }

    const governorateCode = id.slice(7, 9);
    if (!governorateCodes[governorateCode]) {
        console.log("ID failed validation: Invalid governorate code.");
        return { valid: false, error: "Invalid governorate code" };
    }

    return { valid: true };
}

function isValidDate(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    return (
        month >= 1 && month <= 12 &&
        day >= 1 && day <= 31 &&
        birthDate.getDate() === day &&
        birthDate <= today
    );
}

function extractData(id) {
    const centuryCode = id[0];
    const year = centuryCode === "2" ? "19" + id.slice(1, 3) : "20" + id.slice(1, 3);
    const month = id.slice(3, 5);
    const day = id.slice(5, 7);
    const birthDate = `${year}-${month}-${day}`;

    const governorateCode = id.slice(7, 9);
    const governorate = governorateCodes[governorateCode] || "Unknown";

    const gender = parseInt(id[12]) % 2 === 0 ? "Female" : "Male";

    return {
        birthDate,
        gender,
        governorate
    };
}

module.exports = { validateNationalID, extractData };
