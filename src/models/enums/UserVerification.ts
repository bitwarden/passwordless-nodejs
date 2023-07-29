enum UserVerification {
  /**
   * The Relying Party does not want user verification employed during the operation (e.g., in the interest of minimizing disruption to the user interaction flow).
   */
  DISCOURAGED = "discouraged",
  /**
   * The Relying Party prefers user verification for the operation if possible, but will not fail the operation if the response does not have the UV flag set.
   */
  PREFERRED = "preferred",
  /**
   * The Relying Party requires user verification for the operation and will fail the overall ceremony if the response does not have the UV flag set. The client MUST return an error if user verification cannot be performed.
   */
  REQUIRED = "required",
}

export default UserVerification;
