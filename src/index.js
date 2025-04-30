import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import {
  handleUserSignUp,
  handleListUserReviews,
  handleListUserMissions,
} from "./controllers/user.controller.js";
import {
  handleStoreCreate,
  handleListStoreReviews,
  handleListStoreMissions,
} from "./controllers/store.controller.js";
import { handleReviewPost } from "./controllers/review.controller.js";
import {
  handleMissionCreate,
  handleMissionChallenge,
} from "./controllers/mission.controller.js";

import { handleMissionProgress } from "./controllers/missionProgress.controller.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});
// 0.5KB(512바이트) 이상일 때만 압축 적용
app.use(
  compression({
    threshold: 512, // bytes 단위
  })
);
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.set("json replacer", (_, value) =>
  typeof value === "bigint" ? value.toString() : value
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", handleUserSignUp); //유저 회원가입

app.post("/regions/:regionId/stores", handleStoreCreate); //특정 지역에 상점 추가

app.post("/reviews", handleReviewPost); //리뷰 작성

app.post("/missions", handleMissionCreate); //미션 추가

app.post("/missions/challenge", handleMissionChallenge); //가게에 미션 도전

app.get("/stores/:storeId/reviews", handleListStoreReviews); //특정 가게 리뷰 확인

app.get("/users/:userId/reviews", handleListUserReviews); //특정 유저 리뷰 확인

app.get("/stores/:storeId/missions", handleListStoreMissions); //특정 가게 미션 확인

app.get("/users/:userId/missions", handleListUserMissions); //특정 유저 미션 확인

app.patch("/missions/:missionId", handleMissionProgress); //특정 유저 미션 확인

// 예시 라우터
app.get("/large-response", (req, res) => {
  const largeText = "Hello".repeat(1000); // 일부러 큰 응답 생성
  res.send(largeText);
});

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});
/*
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
