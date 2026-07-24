import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Management API",
      version: "1.0.0",
      description:
        "REST API for Task Management System with Authentication and RBAC",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Development Server",
      },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              type: "string",
              example: "veer",
            },
            email: {
              type: "string",
              example: "veer@gmail.com",
            },
            password: {
              type: "string",
              example: "Password@123",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "veer@gmail.com",
            },
            password: {
              type: "string",
              example: "Password@123",
            },
          },
        },

        TaskRequest: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              example: "Complete Backend Assignment",
            },
            description: {
              type: "string",
              example: "Finish the API before Friday",
            },
            priority: {
              type: "string",
              enum: ["LOW", "MEDIUM", "HIGH"],
            },
            status: {
              type: "string",
              enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
            },
            dueDate: {
              type: "string",
              format: "date",
            },
            assignedTo: {
              type: "string",
              example: "6881fd2e20c17791b85222a",
            },
          },
        },

        UpdateRoleRequest: {
          type: "object",
          required: ["role"],
          properties: {
            role: {
              type: "string",
              enum: ["admin", "manager", "user"],
            },
          },
        },

        UpdateTeamRequest: {
          type: "object",
          required: ["team"],
          properties: {
            team: {
              type: "string",
              example: "Development",
            },
          },
        },

        AssignTaskRequest: {
          type: "object",
          required: ["assignedTo"],
          properties: {
            assignedTo: {
              type: "string",
              example: "6881fd2e20c17791b85222a",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;