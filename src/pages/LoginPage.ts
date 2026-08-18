import { Page, Locator } from '@playwright/test';

export class LoginPage {

    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(private page: Page) {
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}