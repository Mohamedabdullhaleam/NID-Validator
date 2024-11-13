const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "National ID Validator API",
            version: "1.0.0",
            description: "API for validating and extracting information from Egyptian National IDs",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./src/routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
