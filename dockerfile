# FROM node:16-alpine

#  # Create app directory
# WORKDIR /usr/src/app

# # copy all of the files from our application to the /usr/src/app directory in our Docker image.
# COPY . .
# # If you are building your code for production
# # RUN npm ci --omit=dev
# RUN npm install

# # Build application
# RUN npm run build

# # We run USER node to avoid running our application as root for security reasons.
# USER node
 
# CMD ["npm", "run", "start"]

FROM node:16-alpine as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder /home/node/package*.json ./
COPY --from=builder /home/node/node_modules/ ./node_modules/
COPY --from=builder /home/node/dist/ ./dist/

CMD ["node", "dist/src/index.js"]