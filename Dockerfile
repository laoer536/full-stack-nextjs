FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install pnpm -g
#RUN npm install -g dotenv-cli
RUN pnpm install
RUN pnpm dlx prisma generate
RUN pnpm build

FROM builder as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
#RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN ls -la /app
RUN ls -la /app/.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]