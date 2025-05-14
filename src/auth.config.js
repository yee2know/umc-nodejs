import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import AppleStrategy from "passport-apple";
dotenv.config();

export const appleStrategy = new AppleStrategy(
  {
    clientID: process.env.PASSPORT_APPLE_CLIENT_ID, // Service ID
    teamID: process.env.PASSPORT_APPLE_TEAM_ID,
    keyID: process.env.PASSPORT_APPLE_KEY_ID,
    privateKey: process.env.PASSPORT_APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    callbackURL: "https://localhost.com:3000/oauth2/callback/apple",
    scope: ["name", "email"],
    response_mode: "form_post",
    state: true,
  },
  (accessToken, refreshToken, idToken, profile, done) => {
    console.log("🍏 AppleStrategy 실행됨");
    appleVerify(idToken, profile)
      .then((user) => {
        console.log("✅ appleVerify 결과:", user);
        done(null, user); // 없으면 로그인 실패 처리됨
      })
      .catch((err) => {
        console.error("❌ appleVerify 에러:", err);
        done(err); // passport가 실패 처리함
      });
  }
);
const appleVerify = async (idToken, profile) => {
  console.log("🍎 Apple ID Token:", idToken);
  console.log("👤 Apple profile:", profile);

  const email = idToken.email;
  if (!email) {
    console.error("❌ 이메일 없음. Apple 로그인 실패");
    throw new Error("Apple ID Token missing email");
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    console.log("🙆‍♂️ 기존 유저 로그인 성공");
    return { id: user.id, email: user.email, name: user.name };
  }

  console.log("🆕 신규 유저 생성 중...");
  const created = await prisma.user.create({
    data: {
      email,
      name: profile?.name?.firstName
        ? `${profile.name.firstName} ${profile.name.lastName ?? ""}`
        : "Apple 사용자",
      gender: "MALE",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      phone_number: "추후 수정",
      point: 0,
      status: "ACTIVE",
      is_auth: true,
      auth: "APPLE",
    },
  });

  console.log("✅ 신규 유저 생성 완료");
  return { id: created.id, email: created.email, name: created.name };
};
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost.com:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "MALE",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      phone_number: "추후 수정",
      point: 0,
      status: "ACTIVE",
      is_auth: true,
      auth: "GOOGLE",
    },
  });
  return { id: created.id, email: created.email, name: created.name };
};
