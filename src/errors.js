export class BaseError extends Error {
  constructor(errorCode, reason, data) {
    super(reason);

    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;

    // 프로토타입 체인 문제 해결
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DuplicateUserEmailError extends BaseError {
  constructor(reason, data) {
    super("U001", reason, data);
  }
}

export class DuplicateUserReviewError extends BaseError {
  constructor(reason, data) {
    super("R001", reason, data);
  }
}

export class DuplicateStoreError extends BaseError {
  constructor(reason, data) {
    super("S001", reason, data);
  }
}

export class DuplicateStoreMissionError extends BaseError {
  constructor(reason, data) {
    super("S002", reason, data);
  }
}

export class ChallengedMissionError extends BaseError {
  constructor(reason, data) {
    super("M001", reason, data);
  }
}

export class NoMissionError extends BaseError {
  constructor(reason, data) {
    super("M002", reason, data);
  }
}
