import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Authentication & Product API",
            version: "1.0.0",
            description: "REST API documentation for authentication, password management and product CRUD operations.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server"
            }
        ],
        components: {
            schemas: {
                SuccessResponse: {
                    type: "object",
                    required: ["success", "message"],
                    properties: {
                        success: {
                            type: "boolean",
                            example: true,
                        },
                        message: {
                            type: "string",
                            example: "User registered successfully.",
                        }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    required: ["success", "message"],
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        message: {
                            type: "string",
                            example: "Internal server error",
                        }
                    }
                }
            }
        }
    },

    apis: [
        "./src/routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
