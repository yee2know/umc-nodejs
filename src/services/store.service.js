import {
  responseFromStore,
  responseFromReviews,
  responseFromMissions,
} from "../dtos/store.dto.js";
import { DuplicateStoreError } from "../errors.js";
import {
  addStore,
  getStore,
  getAllStoreMissions,
  getAllStoreReviews,
} from "../repositories/store.repository.js";
import { prisma } from "../db.config.js";

export const storeCreate = async (data) => {
  const result = await prisma.$transaction(async (tx) => {
    const joinStoreId = await addStore(
      {
        name: data.name,
        regionId: data.regionId,
        storeTypeId: data.storeTypeId,
        location: data.location,
        is_opened: data.is_opened,
        star: data.star,
      },
      tx
    );

    if (joinStoreId === null) {
      throw new DuplicateStoreError("이미 존재하는 상점 이름입니다.", data);
    }

    const store = await getStore(joinStoreId, tx);
    return responseFromStore({ store });
  });
  return result;
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId) => {
  const missions = await getAllStoreMissions(storeId);
  return responseFromMissions(missions);
};
