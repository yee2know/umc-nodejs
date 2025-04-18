export const bodyToMission = (body) => {
  const dday = new Date(body.d_day);
  return {
    store_id: body.store_id,
    d_day: dday,
    goal_money: body.goal_money,
    reward: body.reward,
  };
};

export const responseFromMission = (body) => {
  return {
    mission: body.mission,
  };
};

export const bodyToMissionChallenge = (body) => {
  return {
    mission_id: body.mission_id,
    user_id: body.user_id,
    status: body.status,
  };
};

export const responseFromMissionChallenge = (body) => {
  return {
    missionChallenge: body.missionChallenge,
  };
};
