export const bodyToMissionProgress = (body) => {
  return {
    status: body.status,
  };
};

export const responseFromMissionProgress = (body) => {
  return {
    missionProgress: body.missionProgress,
  };
};
