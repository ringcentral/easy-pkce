/*
 * @Author: Lip Wang (lip.wang@ringcentral.com)
 * @Date: 2021-04-09 14:45:16
 */

import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  generateRandomString,
  generatePair,
} from "../src";
import randombytes from "randombytes";

jest.mock("randombytes", () => {
  return jest
    .fn()
    .mockReturnValue(
      Buffer.from("AkP0RWv8E0melDAoxbbEGUYKc9VGm649bvLxO7mA8wU", "base64")
    );
});

const targetString = "AkP0RWv8E0melDAoxbbEGUYKc9VGm649bvLxO7mA8wU";
const targetCodeChallenge = "qm0vx9e8I4Jj2cDlFfyBiPPfvLBj17QkX1ri0pEpxH0";

describe("test for lib", () => {
  describe("generateRandomString", () => {
    it("should use passed in octet length to generate random string", () => {
      generateRandomString(12);
      expect(randombytes).toHaveBeenCalledWith(12);
    });
    it("should return back correct random string", () => {
      const randomString = generateRandomString(32);
      expect(randomString).toEqual(targetString);
    });
  });

  describe("generateCodeChallenge", () => {
    it("should return back plain version of code challenge if method is plain", () => {
      const codeChallenge = generateCodeChallenge(targetString, "plain");
      expect(codeChallenge).toEqual(targetString);
    });
    it("should return back S256 version of code challenge if method is S256", () => {
      const codeChallenge = generateCodeChallenge(targetString, "S256");
      expect(codeChallenge).toEqual(targetCodeChallenge);
    });
  });

  describe("generateCodeVerifer", () => {
    it("should use passed in octet length to generate code verifier when length is provided", () => {
      generateCodeVerifier(12);
      expect(randombytes).toHaveBeenCalledWith(12);
    });
    it("should use default octet length to generate code verifier when length is not provided", () => {
      generateCodeVerifier();
      expect(randombytes).toHaveBeenCalledWith(32);
    });
    it("should return back code verifier", () => {
      const codeVerifier = generateCodeVerifier();
      expect(codeVerifier).toEqual(targetString);
    });
  });

  describe("generateState", () => {
    it("should use passed in octet length to generate state when length is provided", () => {
      generateState(12);
      expect(randombytes).toHaveBeenCalledWith(12);
    });
    it("should use default octet length to generate state when length is not provided", () => {
      generateState();
      expect(randombytes).toHaveBeenCalledWith(32);
    });
    it("should return back state", () => {
      const state = generateState();
      expect(state).toEqual(targetString);
    });
  });

  describe("generatePair", () => {
    it("should return correct result with code verifier and code challenge", () => {
      const result = generatePair("S256", 32);
      expect(result).toEqual({
        codeVerifier: targetString,
        codeChallenge: targetCodeChallenge,
      });
    });
  });
});
