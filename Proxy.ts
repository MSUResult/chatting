// // middleware.ts
// import { NextResponse } from "next/server";

import { NextResponse } from "next/server";

// export function middleware(req) {
//   const url = req.nextURl.pathname;

//   if (url.startsWith("/") && !req.cookies.get("token")) {
//     return NextResponse.redirect("/auth", req.url);
//   }
// }

// export const config = {
//   matcher: ["/"],
// };

// 2nd way

export function Proxy(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // List of protected routes
  const protectedRoutes = ["/", "/dashboard", "/profile"];

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
