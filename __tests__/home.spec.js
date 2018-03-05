'use strict';
const chalk = require('chalk');
const timeout = 5000;

describe('Home Page', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://localhost:8955');
  }, timeout);

  afterAll(async () => {
    await page.close();
  });

  it('test1', async () => {
    let txt = await page.evaluate(() => document.body.textContent);
    console.log(chalk.green(txt));
    expect(1 + 1).toBe(2);
  });
}, timeout);
