import { responseFromStore } from "../dtos/store.dto.js";
import { addStore, getStore } from "../repositories/store.repository.js";

export const storeCreate = async (data) => {
  const joinStoreId = await addStore({
    name: data.name,
    regionId: data.regionId,
    storeTypeId: data.storeTypeId,
    location: data.location,
  });

  if (joinStoreId === null) {
    throw new Error("이미 존재하는 상점 이름입니다.");
  }

  const store = await getStore(joinStoreId);

  return responseFromStore({ store });
};
