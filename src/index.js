import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import https from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, appleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import { handleUpdateUserProfile } from "./controllers/user.controller.js";
import { ensureAuthenticated } from "./middlewares/auth.middleware.js";
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
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";

dotenv.config();
passport.use(googleStrategy);
passport.use(appleStrategy);
passport.serializeUser((user, done) => {
  const safeUser = {
    ...user,
    point: typeof user.point === "bigint" ? Number(user.point) : user.point,
    id: typeof user.id === "bigint" ? Number(user.id) : user.id, // bigint ID도 있을 수 있음
  };
  done(null, safeUser);
});
passport.deserializeUser((user, done) => done(null, user));
const app = express();
// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 인증서 읽기
const sslOptions = {
  key: fs.readFileSync("/Users/wonjongho/localhost.com/key.pem"),
  cert: fs.readFileSync("/Users/wonjongho/localhost.com/cert.pem"),
};
const port = process.env.PORT;
/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (data) => {
    return res.json({ resultType: "SUCCESS", error: null, data });
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
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      secure: true, // ✅ HTTPS에서 필수!
      httpOnly: true,
      sameSite: "lax", // 또는 "none" (테스트 중엔 "lax" 권장)
      domain: "localhost.com",
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.set("json replacer", (_, value) =>
  typeof value === "bigint" ? value.toString() : value
);
// Swagger UI 페이지
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON 형태 명세도 제공 (Swagger Editor 등에서 사용 가능)
app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("Hello World!");
});
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/apple", passport.authenticate("apple"));

// 콜백 라우트 (POST 요청!)
app.post(
  "/oauth2/callback/apple",
  (req, res, next) => {
    console.log("🍏 Apple callback POST 들어옴");
    next();
  },
  passport.authenticate("apple", {
    failureRedirect: "/oauth2/login/apple",
    session: true,
  }),
  (req, res) => {
    console.log("✅ Apple 로그인 성공. 사용자:", req.user);
    res.redirect("/");
  }
);

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

app.patch("/users/me", ensureAuthenticated, handleUpdateUserProfile);
// 예시 라우터
app.get("/large-response", (req, res) => {
  // #swagger.ignore = true
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
https.createServer(sslOptions, app).listen(3000, () => {
  console.log("✅ HTTPS 서버 실행: https://localhost.com:3000");
});
/*  app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
}); */
