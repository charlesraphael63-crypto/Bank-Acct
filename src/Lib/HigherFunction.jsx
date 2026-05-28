export const ValidateInputs = (userData, error, setError) => {
  if (
    !error.err &&
    userData.fullName &&
    userData.emailAddress &&
    userData.password &&
    userData.confirmPassword
  ) {
    return true;
  } else {
    setError({
      err: true,
      name: "general",
      msg: "Please filled in all fields correctly",
    });
    return false;
  }
};

export const ValidateInput1 = (error, setError, userBio) => {
  if (
    userBio.fullName &&
    userBio.emailAddress &&
    userBio.password &&
    userBio.confirmPassword &&
    !error.err
  ) {
    return true;
  } else {
    setError({
      err: true,
      name: "general",
      msg: "Please filled in all fields correctly",
    });
    return false;
  }
};
