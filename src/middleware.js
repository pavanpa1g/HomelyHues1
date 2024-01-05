import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
  const authToken = request.cookies.get("jwt_token");

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const backloggedINuser =
    request.nextUrl.pathname === "/api/user/login" ||
    request.nextUrl.pathname === "/api/user/signup";

  if (backloggedINuser) {
    return;
  }

  //   console.log(id);
  if (loggedInUserNotAccessPaths) {
    if (authToken) {
      try {
        // Verify the JWT token and retrieve the user data

        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        // Handle invalid or expired token
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      //   return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/explore", "/profile", "/login", "/wishlist"],
};

// "/api/:path*"
