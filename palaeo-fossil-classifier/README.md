# Palaeo Fossil Classifier

This is a website whose purpose is to allow users to classify microfossils.

## Getting Started

You'll need to start both the frontend and the backend DB.

### Frontend

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### DB

To create the database, use the docker postgresql image

```bash
docker pull postgres
docker run --name palaeo-fossil-classifier-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

(NOTE: make sure that the password and the post in the command above match the DATABASE_URL in the .env file)

You also need to create the database and run the migrations

```bash
npx drizzle-kit migrate
```

### Migrations

```bash
npx drizzle-kit generate
```

```bash
npx drizzle-kit migrate
```

## Deployment

-   [Instructions](https://fly.io/docs/launch/continuous-deployment-with-github-actions/)
