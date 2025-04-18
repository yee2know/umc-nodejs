import { pool } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM review WHERE store_id = ? AND user_id = ? ) as isExistReview;`,
      [data.store_id, data.user_id]
    );

    if (confirm[0].isExistReview) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO review (user_id, body, review_star, store_id) VALUES (?, ?, ?, ?);`,
      [data.user_id, data.body, data.review_star, data.store_id]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요.1 (${err})`
    );
  } finally {
    conn.release();
  }
};

// Store 정보 얻기
export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE id = ?;`,
      reviewId
    );

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요.2 (${err})`
    );
  } finally {
    conn.release();
  }
};
