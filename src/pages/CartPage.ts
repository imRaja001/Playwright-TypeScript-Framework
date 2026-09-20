import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    private checkoutButton: Locator;
    private continueBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueBtn = page.locator('#continue-shopping');
    }

    getProduct(productName: string): Locator {
        const cartItem = this.page.locator('.cart_item').filter({
            hasText: productName
        });

        return cartItem.getByText(productName);
    }

    async removeProduct(productName: string) {
        const cartItem = this.page.locator('.cart_item').filter({
            hasText: productName
        });

        await cartItem.getByRole('button', { name: 'Remove' }).click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }


}