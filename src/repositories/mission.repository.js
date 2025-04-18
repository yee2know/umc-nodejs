import { pool } from "../db.config.js";

// Mission 데이터 삽입
export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM review WHERE store_id = ?) as isExistMission;`,
      data.store_id
    );

    if (confirm[0].isExistMission) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission (store_id, d_day, goal_money, reward) VALUES (?, ?, ?, ?);`,
      [data.store_id, data.d_day, data.goal_money, data.reward]
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

// Mission 정보 얻기
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM mission WHERE id = ?;`,
      missionId
    );

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요.2 (${err})`
    );
  } finally {
    conn.release();
  }
};

// Mission 도전 데이터 삽입
export const addMissionChallenge = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission_completed WHERE user_id = ? AND mission_id = ?) as isChallengedMission;`,
      [data.user_id, data.mission_id]
    );

    if (confirm[0].isChallengedMission) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission_completed (mission_id, user_id, status) VALUES (?, ?, ?);`,
      [data.mission_id, data.user_id, data.status]
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

// Mission 도전 정보 얻기
export const getMissionChallenge = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM mission_completed WHERE id = ?;`,
      missionId
    );

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요.2 (${err})`
    );
  } finally {
    conn.release();
  }
};
