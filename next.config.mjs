/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "flagcdn.com", "files.edgestore.dev"],
  },
  webpack: (config, { isServer }) => {
    // Adding node-loader
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    // When targeting the server, Node.js native modules are allowed.
    if (isServer) {
      config.externals = ["canvas", ...config.externals]; // Avoid bundling canvas on the server side
    }

    return config;
  },
};

export default nextConfig;
