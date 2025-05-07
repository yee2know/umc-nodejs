// docs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMC 7th",
      version: "1.0.0",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    servers: [
      {
        url: "http://localhost:3000", // 운영 시에는 실제 도메인으로
      },
    ],
  },
  apis: ["./src/docs/*.js"], // Swagger 주석 있는 파일 경로
};

export const swaggerSpec = swaggerJSDoc(options);
