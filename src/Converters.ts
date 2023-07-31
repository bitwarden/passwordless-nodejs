export class Converters {
  public static uint8ArrayToBase64Url(input: Uint8Array): string {
    const base64String = btoa(String.fromCharCode(...input));
    return base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  public static base64UrlToUint8Array(input: string): Uint8Array {
    const base64 = input
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");

    const binaryString: string = atob(base64);
    const uint8Array: Uint8Array = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return uint8Array;
  }
}

export default Converters;
