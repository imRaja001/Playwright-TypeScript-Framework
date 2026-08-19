import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';

test('successful login', async ({ page, loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page.getByText("Swag Labs")).toBeVisible();

});