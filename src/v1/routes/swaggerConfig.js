const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'University API', 
      version: '1.0.0', 
      description: 'API documentation for University Management System',
    },
  },
  apis: ['./v1/routes/universityRoutes.js'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
