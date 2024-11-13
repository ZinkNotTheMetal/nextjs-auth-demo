# Introduction to NextJS & Next-Auth

## How to begin creating a next project

1. Navigate to the folder where the code is going to live
2. Run the following command

    ```bash
    npx create-next-app@latest
    ```

## How to add Next-Auth into the project

[Getting Started](https://next-auth.js.org/getting-started/example)

1. Add via npm / pnpm

    ```bash
    pnpm add next-auth
    ```

2. `Add api/auth/[...nextauth]/route.ts`
3. Copy the contents (this is the typescript version of the tutorial)
4. Ensure to setup the callback URL inside of discord

    ```text
    http://localhost:3000/api/auth/callback/discord
    ```

## Extra resources

- [RBAC (Role Based Access Control) with NextAuth](https://authjs.dev/guides/role-based-access-control)
- [Discord Auth with Roles](https://hwhite.dev/blog/next-auth-discord-roles)
- [Role based auth with NextJS](https://reacthustle.com/blog/nextjs-setup-role-based-authentication)
- [Auth YouTube video w/ write up](https://www.freecodecamp.org/news/secure-next-js-applications-with-role-based-authentication-using-nextauth/)
- [Complex Middleware](https://medium.com/@chsherryy/implementing-role-based-access-control-in-next-js-next-auth-with-prisma-and-mongodb-324f1929cf93)
