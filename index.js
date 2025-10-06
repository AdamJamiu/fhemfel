require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const http = require("http");

const app = express();
const TARGET_URL = "http://69.197.178.204";

// Enable CORS for mobile apps
app.use(cors());

// Create an HTTP agent to keep the connection alive
const httpAgent = new http.Agent({ keepAlive: true });

// Proxy requests
app.use(
  "/",
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    secure: false, // Allow HTTP connections
    timeout: 30000, // Set timeout to 30 seconds
    proxyTimeout: 30000, // Wait longer for API response.
    agent: httpAgent,
    // pathRewrite: { "^/api": "" },
    onProxyRes(proxyRes) {
      proxyRes.headers["Connection"] = "keep-alive";
    },
  })
);

module.exports = app;
