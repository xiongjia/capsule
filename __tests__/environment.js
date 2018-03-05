
import chalk from 'chalk';
import NodeEnvironment from 'jest-environment-node';
import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';
import path from 'path';

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
