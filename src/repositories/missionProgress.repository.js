import { prisma } from "../db.config.js";

// Mission 도전 데이터 삽입
export const changeMissionProgress = async (missionId, data) => {
  const existing = await prisma.MissionCompleted.findFirst({
    where: {
      id: BigInt(missionId),
    },
  });

  if (!existing) {
    return null;
  }

  const result = await prisma.MissionCompleted.update({
    where: { id: BigInt(missionId) },
    data: {
      status: data.status,
    },
  });

  return result.id;
};

// Mission 도전 정보 얻기
export const getMissionProgress = async (missionId) => {
  const mission = await prisma.MissionCompleted.findUnique({
    where: { id: BigInt(missionId) },
  });

  if (!mission) {
    return null;
  }

  return mission;
};
