import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          headline: profile.given_name ? `${profile.given_name} @ ${profile.hd || 'Campus'}` : undefined,
        }
      }
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          bio: profile.bio || "",
          headline: profile.company || (profile.bio ? profile.bio.slice(0, 50) : ""),
          socialLinks: JSON.stringify({
            github: profile.html_url || "",
            linkedin: "",
            twitter: profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : "",
            portfolio: profile.blog || "",
            other: ""
          })
        }
      }
    }),
  ],
  events: {
    async createUser({ user, profile }) {
      // PrismaAdapter might not save custom fields by default, so we ensure they are saved
      if (user.id && profile) {
        try {
          const updateData: any = {}
          if (profile.bio) updateData.bio = profile.bio
          if (profile.headline) updateData.headline = profile.headline
          if (profile.socialLinks) updateData.socialLinks = profile.socialLinks
          
          if (Object.keys(updateData).length > 0) {
            await prisma.user.update({
              where: { id: user.id },
              data: updateData
            })
          }
        } catch (err) {
          console.error("Error updating user with profile data:", err)
        }
      }
    }
  },
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/auth",
  },
  trustHost: true,
  callbacks: {
    async session({ session, user }: { session: any, user: any }) {
      if (session.user) {
        session.user.id = user.id
        session.user.bio = user.bio || ""
        session.user.headline = user.headline || ""
        session.user.socialLinks = user.socialLinks || ""
      }
      return session
    },
  },
})
