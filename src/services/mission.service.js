import {
  responseFromMission,
  responseFromMissionChallenge,
} from "../dtos/mission.dto.js";
import {
  ChallengedMissionError,
  DuplicateStoreMissionError,
} from "../errors.js";
import {
  addMission,
  getMission,
  addMissionChallenge,
  getMissionChallenge,
} from "../repositories/mission.repository.js";

export const missionCreate = async (data) => {
  const joinMissionId = await addMission({
    store_id: data.store_id,
    d_day: data.d_day,
    goal_money: data.goal_money,
    reward: data.reward,
  });

  if (joinMissionId === null) {
    throw new DuplicateStoreMissionError("이미 존재하는 미션입니다.", data);
  }

  const mission = await getMission(joinMissionId);

  return responseFromMission({ mission });
};

export const missionChallenge = async (data) => {
  const joinMissionChallengeId = await addMissionChallenge({
    mission_id: data.mission_id,
    user_id: data.user_id,
    status: data.status,
  });

  if (joinMissionChallengeId === null) {
    throw new ChallengedMissionError("이미 도전/실패한 미션입니다.", data);
  }

  const missionChallenge = await getMissionChallenge(joinMissionChallengeId);

  return responseFromMissionChallenge({ missionChallenge });
};
