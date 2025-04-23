export const bodyToStore = (body, params) => {
  return {
    name: body.name,
    regionId: params.regionId,
    storeTypeId: body.storeTypeId,
    location: body.location,
    is_opened: body.is_opened,
    star: body.star,
  };
};

export const responseFromStore = (body) => {
  return {
    store: body.store,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
