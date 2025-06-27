import { config } from "./wdio.base.conf";

config.specs = ["../test/specs/test.multiremote.ts"];
config.maxInstances = 2;

config.capabilities = {
  chrome: {
    capabilities: {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ['--headless', '--disable-gpu', '--window-size=1280,1024'],
      },
    },
  },
  firefox: {
    capabilities: {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ['--headless',"--width=1280", "--height=720"],
      },
    },
  },
};
exports.config = config;