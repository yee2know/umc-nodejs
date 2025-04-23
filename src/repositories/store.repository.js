// store.repository.js - Prisma ORM 버전

import { prisma } from "../db.config.js";

// Store 데이터 삽입
export const addStore = async (data) => {
  // 이미 동일한 이름의 스토어가 존재하는지 확인
  const existingStore = await prisma.store.findFirst({
    where: { name: data.name },
  });

  if (existingStore) {
    return null;
  }

  const result = await prisma.store.create({
    data: {
      name: data.name,
      region_id: BigInt(data.regionId),
      store_type_id: BigInt(data.storeTypeId),
      location: data.location,
      is_opened: data.is_opened,
      star: data.star,
    },
  });

  return result.id;
};

// Store 정보 얻기
export const getStore = async (storeId) => {
  const store = await prisma.store.findFirst({
    where: { id: BigInt(storeId) },
  });

  if (!store) {
    return null;
  }

  return store;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      d_day: true,
      store_id: true,
      goal_money: true,
      reward: true,
    },
    where: { store_id: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};
