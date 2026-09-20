import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';
import products from '../../test-data/json/products.json';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navigateTo();

    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    console.log("User logged-in sucessfully");

});

test('complete checkout successfully', async ({ inventoryPage, cartPage, checkoutPage }) => {

    // Add Products to Cart
    for (const product of products.checkoutProducts) {
        await inventoryPage.addProductToCart(product);
        console.log(`${product} is added to the cart`);

    }

    // Verify Cart Badge Count
    await expect(inventoryPage.getCartBadge()).toHaveText(String(products.checkoutProducts.length));

    // Open Cart
    await inventoryPage.openCart();

    // Verify Products
    for (const product of products.checkoutProducts) {
        await expect(cartPage.getProduct(product)).toBeVisible();
        console.log(`${product} is available in the cart`);

    }

    // Checkout
    await cartPage.clickCheckout();

    // Fill Customer Details
    await checkoutPage.fillCustomerDetails(users.checkoutUser);

    // Continue Checkout
    await checkoutPage.continueCheckout();

    // Finish Order
    await checkoutPage.finishOrder();

    // Verify Order Confirmation
    await expect(checkoutPage.isOrderConfirmationVisible()).toBeVisible();
    console.log("Order placed successfully");


});