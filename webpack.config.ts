import { resolve } from "path"
import { Configuration, Loader } from "webpack"
import merge from "webpack-merge"

const projectRoot = __dirname

const sourceFolder = resolve(projectRoot, "src")
const buildFolder = resolve(projectRoot, "build")

const tsLoader: Loader = {
  loader: "ts-loader",
  options: {
    compilerOptions: {
      module: "esnext",
      allowSyntheticDefaultImports: true,
    },
  },
}

const baseConfig: Configuration = {
  output: {
    path: buildFolder,
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: [tsLoader] }],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "none",
}

const mainConfig: Configuration = {
  entry: resolve(sourceFolder, "main/main"),
  output: {
    filename: "main.js",
  },
  target: "electron-main",
}

const rendererConfig: Configuration = {
  entry: resolve(sourceFolder, "renderer/main"),
  output: {
    filename: "renderer.js",
  },
  target: "electron-renderer",
}

export default [
  merge(baseConfig, mainConfig),
  merge(baseConfig, rendererConfig),
]
