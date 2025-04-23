// mission.repository.js - Prisma ORM 버전

import { prisma } from "../db.config.js";

// Mission 데이터 삽입
export const addMission = async (data) => {
  const existing = await prisma.review.findFirst({
    where: { store_id: BigInt(data.store_id) },
  });

  if (existing) {
    return null;
  }

  const result = await prisma.mission.create({
    data: {
      store_id: BigInt(data.store_id),
      d_day: new Date(data.d_day),
      goal_money: data.goal_money,
      reward: data.reward,
    },
  });

  return result.id;
};

// Mission 정보 얻기
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: BigInt(missionId) },
  });

  if (!mission) {
    return null;
  }

  return mission;
};

// Mission 도전 데이터 삽입
export const addMissionChallenge = async (data) => {
  const existing = await prisma.missionCompleted.findFirst({
    where: {
      user_id: BigInt(data.user_id),
      mission_id: BigInt(data.mission_id),
    },
  });

  if (existing) {
    return null;
  }

  const result = await prisma.missionCompleted.create({
    data: {
      mission_id: BigInt(data.mission_id),
      user_id: BigInt(data.user_id),
      status: data.status,
    },
  });

  return result.id;
};

// Mission 도전 정보 얻기
export const getMissionChallenge = async (missionId) => {
  const mission = await prisma.missionCompleted.findUnique({
    where: { id: BigInt(missionId) },
  });

  if (!mission) {
    return null;
  }

  return mission;
};
