export enum Attestation {
  /**
   * A value of "none" indicates that the server does not care about attestation.
   */
  NONE = "none",

  /**
   * A value of "direct" means that the server wishes to receive the attestation data from the authenticator.
   */
  DIRECT = "direct",

  /**
   * A value of "indirect" means that the server will allow for anonymized attestation data.
   */
  INDIRECT = "indirect",
}

export default Attestation;
