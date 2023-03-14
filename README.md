<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
  <img alt="Shows all of the tools in the stack for this template, also listed in the README file." src="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>Next.js 13 Admin Dashboard Template</strong></div>
<div align="center">Built with the new `app` directory (beta).</div>
<br />
<div align="center">
<a href="http://admin-dash-template.vercel.sh/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-planetscale-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview

Original repo: https://github.com/vercel/nextjs-planetscale-nextauth-tailwindcss-template

This is a starter template using the following stack:

- Framework - [Next.js 13](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [PlanetScale](https://planetscale.com)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Tremor](https://www.tremor.so)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

## Overview

This template uses the new `app` directory in Next.js 13 (beta). This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Running with HTTPS locally 
- based off of: 
  - https://dev.to/nakib/using-https-on-next-js-local-development-server-bcd 
  - https://ilango.hashnode.dev/serving-a-nextjs-application-over-https-in-localhost 
  - on my own machine, they are stored: 
    - `/Users/hantswilliams/localhost.pem` 
    - `/Users/hantswilliams/localhost-key.pem`
- have created a `server.js` file
- need to have the local pem files availabile, routed over
- to run it, can do `node server.js` 
  - this means you do not use `npm run dev ` , juse use `node server.js` and that will get things going
- other important notes here for the IG module, e.g., why running HTTPS locally: was getting strange errors previously, need to add these to the .env.local but should not be included in the vercel build: 
  - NEXTAUTH_URL=https://localhost:3000
  - NEXTAUTH_URL_INTERNAL=https://localhost:3000
  - NEXTAUTH_SECRET=e413b27215fc907234974408d5fd4008 
  - NODE_TLS_REJECT_UNAUTHORIZED=0


## Tailwind //
- Components: https://blog.bitsrc.io/best-tailwind-component-libraries-7ca0f99ec815

## Prisma with Vercel 
- Fun note, looks like need to update the package.json build script to include `prisma generate` 
- so it should look like: 
  - ` "build": "prisma generate && next build", ` 

## To look at, tailwind component libraries: 
- https://blog.bitsrc.io/best-tailwind-component-libraries-7ca0f99ec815 
- https://daisyui.com/components/tab/ 
- https://tailwindtemplates.co/templates 


## Vercel Edge functions - streaming 
- https://www.beskar.co/blog/streaming-openai-completions-vercel-edge --> this for pollling
- https://developer.chrome.com/articles/fetch-streaming-requests/ 
- https://github.com/orgs/vercel/discussions/1037
- https://developer.mozilla.org/en-US/docs/Web/API/Streams_API
- good example with openAI: https://github.com/Nutlope/twitterbio/blob/main/utils/OpenAIStream.ts 
- simple hello stream example: https://github.com/jamespantalones/next-js-stream-bug/blob/main/pages/api/hello.tsx 

