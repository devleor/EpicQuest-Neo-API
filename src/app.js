const express = require('express');
const characterRoutes = require('./api/routes/CharacterRoutes');
const errorMiddleware = require('./utils/errorMiddleware');
const gameRoutes = require('./api/routes/GameRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const routesPath = path.resolve(path.dirname(__filename), './api/routes/*.js');

const app = express();

const swaggerDefinition = {
    openapi: '3.0.0',  // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Epic Quest for NEO',  // Title (required)
      version: '1.0.0',  // Version (required)
      description: 'Take home API challange',  // Description (optional)
    },
};
const options = {
    swaggerDefinition,
    apis: [routesPath],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(express.json());
app.use('/characters', characterRoutes);
app.use('/game', gameRoutes);

app.use(errorMiddleware);  // Use the error handling middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

