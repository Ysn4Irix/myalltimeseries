FROM --platform=arm64 node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ARG MONGO_URL=${MONGO_URL}
ENV MONGO_URL=${MONGO_URL}
ENV PORT 80
EXPOSE 80
CMD ["node", "build"]