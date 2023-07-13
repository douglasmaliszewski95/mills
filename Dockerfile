ARG ImageType=node
ARG ImageVersion=18-alpine
FROM ${ImageType}:${ImageVersion} AS base

ENV USER=nextjs
ENV GROUP=nodejs
ENV UID=1001
ENV GID=1001
ENV WORKDIR=/app
ENV PORT=8080

# Install dependencies only when needed

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

RUN apk update -qq \
    && apk add ca-certificates wget curl openssh bash procps openssl perl ttf-dejavu tini \
    && update-ca-certificates \
    && rm -rf /var/lib/{apt,dpkg,cache,log}/ /tmp/* /var/tmp/*

RUN apk add --no-cache libc6-compat

WORKDIR ${WORKDIR}

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR ${WORKDIR}
COPY --from=deps ${WORKDIR}/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

#RUN yarn build

# If using npm comment out above and use below instead
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR ${WORKDIR}

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid ${GID} ${GROUP}
RUN adduser --system --uid ${UID} ${USER}

COPY --from=builder --chown=${USER}:${GROUP} ${WORKDIR}/public ./public
COPY --from=builder ${WORKDIR}/src ./src
COPY --from=builder --chown=${USER}:${GROUP} ${WORKDIR}/.next ./.next
COPY --from=builder ${WORKDIR}/node_modules ./node_modules
COPY --from=builder ${WORKDIR}/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=${USER}:${GROUP} ${WORKDIR}/.next/standalone ./
#COPY --from=builder --chown=${USER}:${GROUP} ${WORKDIR}/.next/static ./.next/static

USER ${USER}

EXPOSE ${PORT}

CMD ["npm", "start"]