// @ts-check
import { test, expect } from '@playwright/test';
import loginPage from "../login.json" assert { type: "json" };

test('has title', async ({ page }) => { 
  await page.goto(loginPage.loginURL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Automation Exercise');
});
