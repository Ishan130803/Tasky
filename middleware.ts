import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/login");

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard/projects", req.url));
      }
      return NextResponse.next();
    } else {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      } else {
        return NextResponse.next();
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/login", "/dashboard/:path*"],
};
