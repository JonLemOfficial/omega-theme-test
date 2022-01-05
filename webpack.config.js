"use strict";

const { merge } = require("webpack-merge");
const commonConf = require("./config/common");
const devConf = require("./config/dev");
const prodConf = require("./config/prod");
const NODE_ENV = !process.env.NODE_ENV ? "development": process.env.NODE_ENV;

module.exports = ( env = {} ) => {
  switch ( NODE_ENV ) {
    case "development": 
      return merge(commonConf(), devConf());
    case "production": 
      return merge(commonConf(), prodConf());
    default:
      throw new Error("No matching configuration was found!");
  }
};