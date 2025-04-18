export const bodyToReview = (reqbody) => {
  return {
    user_id: reqbody.user_id,
    body: reqbody.body,
    review_star: reqbody.review_star,
    store_id: reqbody.store_id,
  };
};

export const responseFromReview = (body) => {
  return {
    review: body.review,
  };
};
