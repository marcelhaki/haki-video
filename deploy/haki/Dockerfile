# Railway's Metal builder rejects the BuildKit frontend directive and cache
# mounts that apps/web/Dockerfile relies on, so this mirrors it without them.
# Kept separate from upstream's Dockerfile so rebasing stays conflict-free.
FROM node:24-alpine AS base
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .

RUN corepack enable pnpm
# --no-frozen-lockfile, not --frozen-lockfile: Railway's builder resolves the
# workspace "overrides" setting differently than a local pnpm 10.5.2 does and
# fails ERR_PNPM_LOCKFILE_CONFIG_MISMATCH. An identical frozen install of this
# same tree passes locally, so the lockfile itself is consistent.
RUN pnpm i --no-frozen-lockfile

# Railway exposes service variables to the build as build args only, so WEB_URL
# has to be redeclared here. packages/env/build.ts resolves NEXT_PUBLIC_WEB_URL
# as WEB_URL ?? NEXT_PUBLIC_WEB_URL, which is what keeps the public origin from
# being baked in as localhost.
#
# That fallback only works on the server. Next inlines NEXT_PUBLIC_* variables
# into the browser bundle and nothing else, so in the client WEB_URL is always
# undefined and NEXT_PUBLIC_WEB_URL has to carry the origin itself. Without it
# the client env check throws "Invalid environment variables" and every
# logged-in page fails to load.
ARG WEB_URL
ENV WEB_URL=$WEB_URL
ENV NEXT_PUBLIC_WEB_URL=$WEB_URL
ARG NEXT_PUBLIC_DOCKER_BUILD=true
ENV NEXT_PUBLIC_DOCKER_BUILD=$NEXT_PUBLIC_DOCKER_BUILD

RUN pnpm run build:web

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/packages/database/migrations ./apps/web/migrations

USER nextjs

EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node apps/web/server.js
