import {
  responseFromUser,
  responseFromReviews,
  responseFromMissions,
} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllUserReviews,
  getAllUserMissions,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phone_number: data.phone_number,
    point: data.point,
    status: data.status,
    is_auth: data.is_auth,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listUserReviews = async (userId) => {
  const reviews = await getAllUserReviews(userId);
  return responseFromReviews(reviews);
};

export const listUserMissions = async (userId, cursor, status) => {
  const reviews = await getAllUserMissions(userId, cursor, status);
  return responseFromMissions(reviews);
};
