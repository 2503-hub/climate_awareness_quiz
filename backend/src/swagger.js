import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Climate Awareness Quiz API",
      version: "1.0.0",
      description: "API documentation for the Climate Awareness Quiz application.",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://climate-awareness-quiz-backend.onrender.com/api"
            : "http://localhost:4000/api",
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
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

