export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: birth,
    address: body.address || "",
    phone_number: body.phoneNumber,
    preferences: body.preferences,
    point: body.point,
    status: body.status,
    is_auth: body.is_auth,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
export class UpdateUserProfileDto {
  constructor({ phone_number, birth, address, gender }) {
    this.phone_number = phone_number;
    this.birth = birth ? new Date(birth) : null;
    this.address = address;
    this.gender = gender;
  }
}
