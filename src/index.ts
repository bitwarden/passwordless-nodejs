import PasswordlessClient from "./PasswordlessClient";
import PasswordlessOptions from "./PasswordlessOptions";

const initialiser = function (
  secret: string,
  options: PasswordlessOptions = {},
) {
  return new PasswordlessClient(secret, options);
};

module.exports = initialiser;
