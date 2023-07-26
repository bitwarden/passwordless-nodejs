import {expect, test} from "@jest/globals";
import Converters from "../src/Converters";

test('Converting an Uint8Array to Base64Url encoding returns expected result.', async () => {
    const arr: Uint8Array = Uint8Array.from([153, 243, 198, 114, 217, 212, 68, 78, 75, 218, 17, 70, 89, 227, 172, 190, 45, 103, 97, 127, 163, 69, 149 ,82, 47, 217, 212, 116, 137, 161, 194, 183, 192, 193, 84, 161, 190, 37, 32, 35, 29, 237, 214, 144, 27, 41, 128, 21]);

    const actual = Converters.uint8ArrayToBase64Url(arr);
    expect(actual).toEqual('mfPGctnURE5L2hFGWeOsvi1nYX-jRZVSL9nUdImhwrfAwVShviUgIx3t1pAbKYAV');
});

test('Converting an Base64URl to Uint8Array encoding returns expected result.', async () => {
    const base64Url: string = 'mfPGctnURE5L2hFGWeOsvi1nYX-jRZVSL9nUdImhwrfAwVShviUgIx3t1pAbKYAV';

    const actual = Converters.base64UrlToUint8Array(base64Url);
    expect(actual).toEqual(Uint8Array.from([153, 243, 198, 114, 217, 212, 68, 78, 75, 218, 17, 70, 89, 227, 172, 190, 45, 103, 97, 127, 163, 69, 149 ,82, 47, 217, 212, 116, 137, 161, 194, 183, 192, 193, 84, 161, 190, 37, 32, 35, 29, 237, 214, 144, 27, 41, 128, 21]));
});