export const bodyToStore = (body, params) => {
  return {
    name: body.name,
    regionId: params.regionId,
    storeTypeId: body.storeTypeId,
    location: body.location,
  };
};

export const responseFromStore = (body) => {
  return {
    store: body.store,
  };
};
