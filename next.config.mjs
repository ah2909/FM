/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "coin-images.coingecko.com",
				port: "",
				pathname: "/coins/images/**",
			},
			{
				protocol: "https",
				hostname: "th.bing.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
