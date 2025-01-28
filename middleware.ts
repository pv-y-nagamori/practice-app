import { withAuth } from 'next-auth/middleware';  

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
});

export const config = {
    matcher: ['/((?!login).*)'],
};