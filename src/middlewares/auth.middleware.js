export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).error({
    errorCode: "unauthorized",
    reason: "로그인이 필요한 요청입니다.",
  });
}
