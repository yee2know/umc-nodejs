import { StatusCodes } from "http-status-codes";
import { bodyToMissionProgress } from "../dtos/missionProgress.dto.js";
import { missionChangeProgress } from "../services/missionProgress.service.js";

export const handleMissionProgress = async (req, res, next) => {
  console.log("미션 진행 상태를 변경했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const missionProgress = await missionChangeProgress(
    parseInt(req.params.missionId),
    bodyToMissionProgress(req.body)
  );
  res.status(StatusCodes.OK).success(missionProgress);
};
