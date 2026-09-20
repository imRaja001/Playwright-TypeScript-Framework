import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

    private cart: Locator;
    private cartBadge: Locator;
    private sortDropdown: Locator;
    private productPrices: Locator;
    private productNames: Locator;

    constructor(page: Page) {
        super(page);

        this.cart = page.locator('#shopping_cart_container');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
    }

    async addProductToCart(productName: string) {

        const product = this.page.locator('.inventory_item').filter({
            hasText: productName
        });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeProductFromCart(productName: string) {

        const product = this.page.locator('.inventory_item').filter({
            hasText: productName
        });

        await product.getByRole('button', { name: 'Remove' }).click();
    }

    getCartBadge(): Locator {
        return this.cartBadge;
    }

    async openCart() {
        await this.cart.click();
    }

    async sortProductsBy(sortBy: string) {
        await this.sortDropdown.selectOption({ label: sortBy });
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();
        return prices.map(price => Number(price.replace('$', '')));
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

}