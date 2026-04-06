# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_BACKEND_URL=https://spotify-backend-757684232443.us-central1.run.app

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package*.json ./
RUN npm ci

COPY . .

# Create .env.production file with build variables
RUN echo "VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}" > .env.production && \
    echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" >> .env.production

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["/entrypoint.sh"]
