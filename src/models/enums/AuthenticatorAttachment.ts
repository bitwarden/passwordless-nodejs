export enum AuthenticatorAttachment {
  /**
   * A platform authenticator is attached using a client device-specific transport, called platform attachment, and is usually not removable from the client device.
   */
  PLATFORM = "platform",

  /**
   * A roaming authenticator is attached using cross-platform transports, called cross-platform attachment. Authenticators of this class are removable from, and can "roam" between, client devices.
   */
  CROSS_PLATFORM = "cross-platform",
}

export default AuthenticatorAttachment;
