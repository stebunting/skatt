import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";
import path from "path";

interface Configuration extends WebpackConfiguration {
  devServer: WebpackDevServerConfiguration;
}

interface Args {
  mode: "production" | "development";
}

const config = (_: void, argv: Args): Configuration => ({
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        exclude: /node_modules/i,
        use: "ts-loader",
      },
      {
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
                exportLocalsConvention: "camel-case-only",
              },
            },
          },
          "sass-loader",
        ],
        include: /\.module\.scss$/i,
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /\.module\.scss$/i,
      },
      {
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
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  output: {
    filename: "js/[contenthash].js",
    assetModuleFilename: "images/[contenthash][ext]",
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

export default config;
