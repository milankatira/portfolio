const MillionLint = require("@million/lint");
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const DeadCodePlugin = require("webpack-deadcode-plugin");
//res.cloudinary.com
module.exports = MillionLint.next()(
  withBundleAnalyzer({
    reactStrictMode: true,
    profiler: true,
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
    images: {
      remotePatterns: [
        {
          hostname: "res.cloudinary.com",
        },
        {
          hostname: "instaservice-dev.s3.us-west-2.amazonaws.com",
        },
      ],
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
  })
);
