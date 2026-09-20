import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutUser } from '../types/CheckoutUser';

export class CheckoutPage extends BasePage {

    private firstName: Locator;
    private lastName: Locator;
    private postalCode: Locator;
    private continueButton: Locator;
    private finishButton: Locator;
    private orderConfirmation: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.orderConfirmation = page.getByText('Thank you for your order!');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillCustomerDetails(customer: CheckoutUser) {
        await this.firstName.fill(customer.firstName);
        await this.lastName.fill(customer.lastName);
        await this.postalCode.fill(customer.postalCode);
    }

    async fillFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }
    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    isOrderConfirmationVisible() {
        return this.orderConfirmation;
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }
}