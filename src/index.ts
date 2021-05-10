/*
 * @Author: Lip Wang (lip.wang@ringcentral.com)
 * @Date: 2021-04-09 14:40:13
 */

import randombytes from "randombytes";
import SHA from "sha.js";

// Recommended by RFC 7636: Proof Key for Code Exchange
// https://tools.ietf.org/html/rfc7636#page-8
const DEFAULT_OCTET_LENGTH = 32;

function base64URLEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function generateRandomString(octet_length: number) {
  return base64URLEncode(randombytes(octet_length));
}

function sha256(value: string) {
  return SHA("sha256").update(value).digest();
}

function generateCodeVerifier(octet_length: number = DEFAULT_OCTET_LENGTH) {
  return generateRandomString(octet_length);
}

function generateState(octet_length: number = DEFAULT_OCTET_LENGTH) {
  return generateRandomString(octet_length);
}

function generateCodeChallenge(value: string, method: "S256" | "plain") {
  if (method === "plain") {
    return value;
  }
  return base64URLEncode(sha256(value));
}

function generatePair(
  method: "S256" | "plain",
  octet_length: number = DEFAULT_OCTET_LENGTH
) {
  const codeVerifier = generateCodeVerifier(octet_length);
  const codeChallenge = generateCodeChallenge(codeVerifier, method);
  return { codeVerifier, codeChallenge };
}

export {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  generateRandomString,
  generatePair,
};
