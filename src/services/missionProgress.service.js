import { responseFromMissionProgress } from "../dtos/missionProgress.dto.js";
import { NoMissionError } from "../errors.js";
import {
  changeMissionProgress,
  getMissionProgress,
} from "../repositories/missionProgress.repository.js";

export const missionChangeProgress = async (missionId, data) => {
  const joinMissionProgressId = await changeMissionProgress(
    missionId,
    data.status
  );

  if (joinMissionProgressId === null) {
    throw new NoMissionError("미션이 존재하지 않습니다.");
  }

  const missionProgress = await getMissionProgress(joinMissionProgressId);

  return responseFromMissionProgress({ missionProgress });
};
