import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";
// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: { id: true, body: true, store_id: true, user_id: true },
    where: { user_id: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllUserMissions = async (userId, cursor, status) => {
  const reviews = await prisma.missionCompleted.findMany({
    select: { id: true, user_id: true, mission_id: true, status: true },
    where: { user_id: userId, id: { gt: cursor }, status: status },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
