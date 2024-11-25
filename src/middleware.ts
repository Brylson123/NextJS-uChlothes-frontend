import {NextRequest, NextResponse} from 'next/server';
import * as jose from "jose";

interface response {
    success: boolean
}

export async function middleware(req: NextRequest) {
    const jwtToken = req.cookies.get("jwt")?.value;
    console.log(jwtToken);
    console.log('Cookies:', req.cookies);

    if (!jwtToken) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    try {
        const {payload} = await jose.jwtVerify(jwtToken, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
        const isTokenValid = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getUserByToken/${jwtToken}`);
        const isTokenValidResponse: response = await isTokenValid.json();
        console.log(isTokenValidResponse.success);
        if (!payload || payload.role !== 'ADMIN' || !isTokenValidResponse.success) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }
}

export const config = {
    matcher: [
        '/admin/:path((?!login).*)',
    ],
};
