import { parseCookies, setCookie, destroyCookie } from "nookies";
import jsonwebtoken from "jsonwebtoken";

//REMOVE JWT FROM COOKIE

export function removeToken() {
  destroyCookie(null, "jwt", {
    path: "/",
  });
}

//EXTRACT JWT FROM COOKIE
export function getToken(context) {
  try {
    return parseCookies(context).jwt || null;
  } catch (err) {
    return false;
  }
}

// CHECK IF JWT INCLUDE USERID AND RETURN IT
export function isPermitted(context) {
  try {
    const jwt = parseCookies(context).jwt || null;
    if (!jwt) {
      return null;
    }
    const decodedClaims = jsonwebtoken.verify(jwt, "secret");
    if (decodedClaims.userId) return decodedClaims.userId;

    return false;
  } catch (err) {
    return false;
  }
}


// CHECK IF ADMIN
export function isAdmin(context) {
  try {
    const jwt = parseCookies(context).jwt || null;
    if (!jwt) {
      return false;
    }
    const decodedClaims = jsonwebtoken.verify(jwt, "secret");
    if (decodedClaims.admin) return true;

    return false;
  } catch (err) {
    return false;
  }
}
