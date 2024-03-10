const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const DeadCodePlugin = require("webpack-deadcode-plugin");

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "css")],
  },
  trailingSlash: true,
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack(config, options) {
    // Add the DeadCodePlugin to the webpack config
    config.plugins.push(
      new DeadCodePlugin({
        patterns: [
          // Add patterns for files/folders you want to analyze for dead code elimination
          path.resolve(__dirname, "src/**/*.js"),
        ],
        exclude: [
          // Add any exclusions if needed
          "**/*.test.js",
          "**/*.spec.js",
        ],
      })
    );

    return config;
  },
});
