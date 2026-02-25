FROM oven/bun:1
WORKDIR /admin-panel
COPY . /admin-panel

COPY package.json .
COPY bun.lock .
RUN bun install
RUN bun run build

ENTRYPOINT ["bun", "run", "start"]