# Stage 1: Development the application
FROM node:20-alpine as development

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the source code to the container
COPY apps/auth apps/auth
COPY libs libs

# Install dependencies
RUN cd apps/auth && pnpm install 

# Build the application
RUN pnpm run build auth

# Stage 2: Production the application
FROM node:20-alpine as production

# Arguments for the stage
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --prod

# Copy the builded application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Run the application

CMD ["node",'dist/apps/auth/main']







