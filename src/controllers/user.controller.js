import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import {
  userSignUp,
  listUserReviews,
  listUserMissions,
} from "../services/user.service.js";
import { UpdateUserProfileDto } from "../dtos/user.dto.js";
import { UserService } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success({
    ...user,
    point: Number(user.point), // BigInt → Number 변환
  });
};

export const handleListUserReviews = async (req, res, next) => {
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListUserMissions = async (req, res, next) => {
  const missions = await listUserMissions(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0,
    req.query.status
  );
  res.status(StatusCodes.OK).success(missions);
};
export const handleUpdateUserProfile = async (req, res) => {
  try {
    const dto = new UpdateUserProfileDto(req.body);
    const updated = await UserService.updateUserProfile(req.user.id, dto);
    res.success(updated);
  } catch (err) {
    console.error("[UserProfileUpdateError]", err);
    res.error({ reason: err.message });
  }
};
