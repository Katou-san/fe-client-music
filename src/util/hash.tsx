import { encode } from "js-base64";

function hash64(pass: string) {
  return encode(pass);
}

export { hash64 };
