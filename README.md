This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## installed node modules

https://www.npmjs.com/package/clsx
https://www.npmjs.com/package/reselect

### 1. Docker-compose Setup on Local machine

```bash
Prerequisite :
- Docker and Docker-compose intalled on Local Machine
- Aws Profile
```

### Create AWS Profile

```bash
- aws configure --profile <profile_name> ##add your access key and secret key
```

### Create Docker container

```bash
- git clone <git_url>
#update .env-hasura file with your credentials
using below command your all container will up and running
-docker-compose --env-file .env-hasura up -d

#for stopping docker-continer
- docker-compose --env-file .env-hasura down
```

### How to build Docker image locally

```
for build Docker image locally you just need to run below command and update your access key, secret key and tag

- docker build --build-arg AWS_ACCESS_KEY_ID=<your_access_key> --build-arg AWS_SECRET_ACCESS_KEY=<you_Secret_key> -t 494473211790.dkr.ecr.us-east-1.amazonaws.com/resai-frontend:<your_tag> .

#once you image is build you need to update tag in .env-hasura file and run above docker-compose commands.

```
