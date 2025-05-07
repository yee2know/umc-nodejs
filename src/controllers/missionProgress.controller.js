import { StatusCodes } from "http-status-codes";
import { bodyToMissionProgress } from "../dtos/missionProgress.dto.js";
import { missionChangeProgress } from "../services/missionProgress.service.js";

export const handleMissionProgress = async (req, res, next) => {
  /*
  #swagger.summary = '미션 진행 상태 변경 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["IN_PROGRESS", "COMPLETED"] },
          },
        },
      },
    },
  };
  #swagger.responses[200] = {
    description: "미션 진행 상태 변경 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            data: {
              type: "object",
              properties: {
                missionProgress: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    missionId: { type: "number" },
                    userId: { type: "number" },
                    status: { type: "string", enum: ["PENDING", "SUCCESS", "FAIL"] },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "missionId에 해당하는 미션이 존재하지 않음",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: { type: "object", nullable: true, properties: {
            errorCode: { type: "string", example: "M002" },
              reason: { type: "string", example: "미션이 존재하지 않습니다." },
              data: { type: "object", nullable: true, example: null}
            }},
            success: { type: "object", nullable: true, example: null },
          },
        },
      },
    },
  };
  */
  console.log("미션 진행 상태를 변경했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const missionProgress = await missionChangeProgress(
    parseInt(req.params.missionId),
    bodyToMissionProgress(req.body)
  );
  res.status(StatusCodes.OK).success(missionProgress);
};
