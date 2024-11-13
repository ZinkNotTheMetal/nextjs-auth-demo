import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ["identify", "guilds"].join(" ")

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    // Specify provider(s) here
    DiscordProvider({
      name: 'Discord',
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      authorization: {
        params: { scope: scopes.concat(" guilds.members.read") }
      },

      async profile(profile, tokens) {
        let isAuthorized = false

        // Fetch the list of servers the user is a member of
        const response = await fetch(
          "https://discord.com/api/users/@me/guilds",
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        )
  
        const guilds = await response.json()

        console.log('guilds', guilds)

        // Check if the user is a member of the target server
        const targetGuild = guilds.find(
          (guild: any) => guild.id === "1234476116937408554"
        )
 
        if (targetGuild) {
          // If the user is a member of the target server, they are authorized
          isAuthorized = true
 
          // Fetch the member data from our auth server
          const memberResponse = await fetch(
            `https://discord.com/api/users/@me/guilds/1234476116937408554/member`,
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            }
          )
 
          const memberData = await memberResponse.json()
 
          // Check if the member has the 'adult' role
          // isAdult =
          //   isAuthorized &&
          //   memberData.roles.includes(process.env.DISCORD_ADULT_ROLE)
 
          // Assign roles to profile
        }
 
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          isAuthorized: isAuthorized,
          guilds: guilds,
          // isAdult: isAdult,
        }
      }
    })
  ],

  callbacks: {
    // When Sign In is called this function will fire
    //  Getting token info and putting in console
    async signIn({ user, account, profile }: any) {
      const discordUser = await fetch(`https://discord.com/api/users/@me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      }).then((res) => res.json());
  
      console.log(discordUser);

      return user
    },
    
    // Modify the JWT Token
    async jwt({ token, user, account, profile }) {
      return { ...token, ...user}
    },

    // This is how I can modify the session object
    async session({ session, user, token }: any) {
      return session
    },
  },
})

export { handler as GET, handler as POST }