FROM --platform=arm64 node:18-alpine
ARG MONGO_URL=${MONGO_URL}
ENV MONGO_URL=${MONGO_URL}
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ENV PORT 80
EXPOSE 80
CMD ["node", "build"]