import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import users from '../../test-data/json/users.json';

test('successful login', async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page.getByText("Swag Labs")).toBeVisible();

});