import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

interface Response {
    success: boolean;
}

export async function middleware(req: NextRequest) {
    const jwtToken = req.cookies.get('jwt')?.value;
    console.log('JWT Token:', jwtToken);

    if (!jwtToken) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
        const { payload } = await jose.jwtVerify(
            jwtToken,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        );

        const isTokenValid = await fetch(`${process.env.NEXT_PUBLIC_API_PROXY}/user/getUserByToken/${jwtToken}`);

        const isTokenValidResponse: Response = await isTokenValid.json();
        console.log('Response from Backend:', isTokenValidResponse.success);

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
    matcher: ['/admin/:path((?!login).*)'],
};
