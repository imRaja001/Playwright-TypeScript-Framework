import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';
import products from '../../test-data/json/products.json';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navigateTo();

    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    console.log("User logged-in sucessfully");

});

test('Removed product from the cart and validate the cart badge count', async ({ inventoryPage, cartPage }) => {

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

    const removedProduct = 'Sauce Labs Fleece Jacket';

    await cartPage.removeProduct(removedProduct);

    // Verify product is removed
    await expect(cartPage.getProduct(removedProduct)).not.toBeVisible();

    // Verify Cart Badge Count
    await expect(inventoryPage.getCartBadge()).toHaveText(String(products.checkoutProducts.length - 1));

});

test('Add new product from cart and validate the cart badge count', async ({ page, inventoryPage, cartPage }) => {

    // Add Products to Cart
    for (const product of products.checkoutProducts) {
        await inventoryPage.addProductToCart(product);
        console.log(`${product} is added to the cart`);
    }

    // Verify Cart Badge Count
    await expect(inventoryPage.getCartBadge())
        .toHaveText(String(products.checkoutProducts.length));

    // Open Cart
    await inventoryPage.openCart();

    // Verify Products
    for (const product of products.checkoutProducts) {
        await expect(cartPage.getProduct(product)).toBeVisible();
        console.log(`${product} is available in the cart`);
    }

    // Click Continue Shopping
    await cartPage.clickContinueBtn();

    // Validate Inventory Page
    await expect(page).toHaveURL('/inventory\.html');

    // Add New Product
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Verify Updated Cart Badge Count
    await expect(inventoryPage.getCartBadge()).toHaveText(String(products.checkoutProducts.length + 1));
});

test('Remove product directly from inventory page and validate the cart badge count', async ({ inventoryPage }) => {
    const productOrg = 'Sauce Labs Backpack';


    // Add Products to Cart
    await inventoryPage.addProductToCart(productOrg);
    console.log(`${productOrg} is added to the cart`);

    // Verify Cart Badge Count
    await expect(inventoryPage.getCartBadge()).toHaveText('1');

    // remove product directly from inventory page
    await inventoryPage.removeProductFromCart(productOrg);
    console.log(`${productOrg} is removed from the cart`);

    // Verify Cart Badge Count
    await expect(inventoryPage.getCartBadge()).not.toBeVisible();

});

test('remove one product from inventory and verify remaining product in cart', async ({ inventoryPage, cartPage }) => {
    const product1 = 'Sauce Labs Backpack';
    const product2 = 'Sauce Labs Fleece Jacket';


    // Add Products to Cart
    await inventoryPage.addProductToCart(product1);
    await inventoryPage.addProductToCart(product2);
    console.log(`${product1} and ${product2} are added to the cart`);

    // Verify Cart Badge Count
    await expect(inventoryPage.getCartBadge()).toHaveText('2');

    // remove product directly from inventory page
    await inventoryPage.removeProductFromCart(product1);
    console.log(`${product1} is removed from the cart`);

    // Verify Cart Badge Count
        await expect(inventoryPage.getCartBadge()).toHaveText('1');

    // Open Cart
    await inventoryPage.openCart();

    // Verify remaining Product in the cart
    await expect(cartPage.getProduct(product2)).toBeVisible();

});