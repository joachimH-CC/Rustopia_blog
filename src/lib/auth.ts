import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn({ profile }) {
      // Only allow the blog owner's GitHub account
      return profile?.login === process.env.GITHUB_ADMIN_USERNAME
    },
  },
})
