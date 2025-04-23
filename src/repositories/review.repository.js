// review.repository.js - Prisma ORM 버전 (addReview & getReview)

import { prisma } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const existing = await prisma.review.findFirst({
    where: {
      store_id: BigInt(data.store_id),
      user_id: BigInt(data.user_id),
    },
  });

  if (existing) {
    return null;
  }

  const result = await prisma.review.create({
    data: {
      user_id: BigInt(data.user_id),
      store_id: BigInt(data.store_id),
      review_star: data.review_star,
      body: data.body,
    },
  });

  return result.id;
};

// Review 정보 얻기
export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: BigInt(reviewId) },
  });

  if (!review) {
    return null;
  }

  return review;
};
