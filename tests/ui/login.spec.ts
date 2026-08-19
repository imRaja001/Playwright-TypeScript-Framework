import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );
});

test('successful login', async ({ page }) => {
    await expect(page.getByText("Swag Labs")).toBeVisible();
});

test('user is redirected to inventory page after login', async ({ page }) =>{
    await expect(page).toHaveURL('/inventory\.html/');
});