const path = require("path")

module.exports = (env) => {
	return {
		externalsPresets: { node: true },
		mode: "development",
		entry: "./index.js",
		target: "node",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "index.js",
			libraryTarget: "commonjs",
		},
		module: {
			rules: [
				{ test: /\.png$|\.jpg$/, type: "asset/resource" },
			],
		},
		optimization: {
			minimize: false,
		},
	};
};
