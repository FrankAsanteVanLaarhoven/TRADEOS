# ==============================================================================
# TradeOS Africa - Sovereign B2B Commerce Operating System
# Enterprise Multi-Stage Production Container Specification
# ==============================================================================

FROM node:20-alpine AS runtime

# Install tini for clean PID 1 signal management & curl for container health probes
RUN apk add --no-cache tini curl

# Establish secure non-privileged application directory
WORKDIR /app

# Configure hardened production environment variables
ENV NODE_ENV=production \
    PORT=8080 \
    HOST=0.0.0.0

# Copy package manifests
COPY package.json ./

# Copy core server daemon and public static distribution
COPY server.js ./
COPY public ./public

# Ensure files are owned by unprivileged node user
RUN chown -R node:node /app

# Drop root privileges
USER node

# Expose standard container ingress port
EXPOSE 8080

# Production Container Healthcheck Probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Launch with tini init system
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
