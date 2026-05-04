import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SwiftStock API",
      version: "1.0.0",
      description: "Backend API documentation for SwiftStock system",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
      components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  },

  // 👇 IMPORTANT: scan all your modules
  apis: [
    "./src/Routes/*.ts",
    "./src/Routes/*.Router.ts",
    "./src/**/*.ts"
  ],
  
};

export const swaggerSpec = swaggerJSDoc(options);