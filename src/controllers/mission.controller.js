import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToMissionChallenge } from "../dtos/mission.dto.js";
import {
  missionCreate,
  missionChallenge,
} from "../services/mission.service.js";

export const handleMissionCreate = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await missionCreate(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

export const handleMissionChallenge = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const missionChall = await missionChallenge(bodyToMissionChallenge(req.body));
  res.status(StatusCodes.OK).success(missionChall);
};
