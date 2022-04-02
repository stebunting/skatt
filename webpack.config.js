const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = (_, argv) => ({
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/i,
				exclude: /node_modules/i,
				use: "ts-loader",
			}, {
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"@teamsupercell/typings-for-css-modules-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: {
								namedExport: false,
								exportLocalsConvention: 'camel-case-only'
							},
						}
					},
					"sass-loader"
				],
				include: /\.module\.scss$/i
			}, {
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				],
				exclude: /\.module\.scss$/i
			}, {
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/templates/index.ejs",
		}),
		new MiniCssExtractPlugin({
			filename: "css/[contenthash].css",
		}),
		new ESLintPlugin({
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			failOnWarning: argv.mode === "production",
		}),
		new StyleLintPlugin({
			extensions: ".scss",
			failOnWarning: argv.mode === "production",
		})
	],
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
	output: {
		filename: "js/[contenthash].js",
		assetModuleFilename: "images/[contenthash][ext]"
	},
	devServer: {
		port: 3000,
		historyApiFallback: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
});
