import { pool } from "../db.config.js";

// Store 데이터 삽입
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) as isExistStoreName;`,
      data.name
    );

    if (confirm[0].isExistStoreName) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO store (name, region_id, store_type_id, location) VALUES (?, ?, ?, ?);`,
      [data.name, data.regionId, data.storeTypeId, data.location]
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
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE id = ?;`,
      storeId
    );

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요.2 (${err})`
    );
  } finally {
    conn.release();
  }
};
