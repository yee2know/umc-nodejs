import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewPost } from "../services/review.service.js";

export const handleReviewPost = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await reviewPost(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};