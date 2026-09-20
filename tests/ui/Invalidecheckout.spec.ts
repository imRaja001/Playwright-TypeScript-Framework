import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';
import products from '../../test-data/json/products.json';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navigateTo();

    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    console.log("User logged-in sucessfully");

});

test('should show error when customer details are missing', async ({ inventoryPage, cartPage, checkoutPage }) => {

    // Add Products to Cart
    for (const product of products.checkoutProducts) {
        await inventoryPage.addProductToCart(product);
        console.log(`${product} is added to the cart`);

    }

    // Open Cart
    await inventoryPage.openCart();

    // Verify Products
    for (const product of products.checkoutProducts) {
        await expect(cartPage.getProduct(product)).toBeVisible();
        console.log(`${product} is available in the cart`);

    }

    // Checkout
    await cartPage.clickCheckout();

    // Continue Checkout
    await checkoutPage.continueCheckout();

    // Verify error msg for customer details field
    await expect(checkoutPage.getErrorMessage()).toContainText('Error: First Name is required');

});

test('should show error when last name is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {

    // Add products
    for (const product of products.checkoutProducts) {
        await inventoryPage.addProductToCart(product);
    }

    // Open cart
    await inventoryPage.openCart();

    // Checkout
    await cartPage.clickCheckout();

    // Fill only First Name
    await checkoutPage.fillFirstName(users.checkoutUser.firstName);

    // Continue
    await checkoutPage.continueCheckout();

    // Verify error msg when last name is missing
    await expect(checkoutPage.getErrorMessage()).toContainText('Error: Last Name is required');
});

test('should show error when postal code is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {

    // Add products
    for (const product of products.checkoutProducts) {
        await inventoryPage.addProductToCart(product);
    }

    // Open cart
    await inventoryPage.openCart();

    // Checkout
    await cartPage.clickCheckout();

    // Fill only First Name
    await checkoutPage.fillFirstName(users.checkoutUser.firstName);
    await checkoutPage.fillLastName(users.checkoutUser.lastName);

    // Continue
    await checkoutPage.continueCheckout();

    // Verify error msg when postal code is missing
    await expect(checkoutPage.getErrorMessage()).toContainText('Error: Postal Code is required');
});