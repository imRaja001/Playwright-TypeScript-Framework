import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();

    await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
    );
});

test('error msg validation', async ({ loginPage }) => {
    await expect(loginPage.getErrorMessage()).toContainText('Username and password do not match');
});