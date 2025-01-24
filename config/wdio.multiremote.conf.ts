import { config } from "./wdio.base.conf";

config.specs = ["../test/specs/test.multiremote.ts"];
config.maxInstances = 2;

config.capabilities = {
  chrome: {
    capabilities: {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ['headless', 'disable-gpu'],
      },
    },
  },
  firefox: {
    capabilities: {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ['-headless'],
      },
    },
  },
};
exports.config = config;