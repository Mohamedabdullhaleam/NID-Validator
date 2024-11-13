const express = require('express');
const routes = require('./routes/idRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');  // Importing from config folder
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
    console.log(`Swagger docs available at http://127.0.0.1:${PORT}/api-docs`);
});
