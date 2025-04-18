import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreCreate } from "./controllers/store.controller.js";
import { handleReviewPost } from "./controllers/review.controller.js";
import {
  handleMissionCreate,
  handleMissionChallenge,
} from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", handleUserSignUp); //유저 회원가입

app.post("/regions/:regionId/stores", handleStoreCreate); //특정 지역에 상점 추가

app.post("/reviews", handleReviewPost); //리뷰 작성

app.post("/missions", handleMissionCreate); //미션 추가

app.post("/missions/challenge", handleMissionChallenge); //가게에 미션 도전

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
