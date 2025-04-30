import { responseFromReview } from "../dtos/review.dto.js";
import { DuplicateUserReviewError } from "../errors.js";
import { addReview, getReview } from "../repositories/review.repository.js";

export const reviewPost = async (data) => {
  const joinReviewId = await addReview({
    user_id: data.user_id,
    body: data.body,
    review_star: data.review_star,
    store_id: data.store_id,
  });

  if (joinReviewId === null) {
    throw new DuplicateUserReviewError("이미 존재하는 리뷰입니다.");
  }

  const review = await getReview(joinReviewId);

  return responseFromReview({ review });
};
