import { test, expect } from '../../src/fixtures/test.fixture';
import users from '../../test-data/json/users.json';
import products from '../../test-data/json/products.json';

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navigateTo();

    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    console.log("User logged-in sucessfully");

});

test('sort products by price low to high and verify prices are in ascending order', async ({ inventoryPage }) => {

    const pricesBeforeSort = await inventoryPage.getProductPrices();
    const expectedPrices = [...pricesBeforeSort].sort((a, b) => a - b);

    // sort the prduct by price low to high
    await inventoryPage.sortProductsBy('Price (low to high)');
    const actualPrices = await inventoryPage.getProductPrices();

    expect(actualPrices).toEqual(expectedPrices);
});

test('sort products by price high to low and verify prices are in descending order', async ({ inventoryPage }) => {

    const pricesBeforeSort = await inventoryPage.getProductPrices();
    const expectedPrices = [...pricesBeforeSort].sort((a, b) => b - a);

    // sort the prduct by price high to low
    await inventoryPage.sortProductsBy('Price (high to low)');
    const actualPrices = await inventoryPage.getProductPrices();
    
    expect(actualPrices).toEqual(expectedPrices);
});

test('sort products by name Z to A and verify names are in descending order', async ({ inventoryPage }) => {

    const namesBeforeSort = await inventoryPage.getProductNames();
    const expectedNames = [...namesBeforeSort].sort().reverse();
    
    // sort the prduct by Name (Z to A)
    await inventoryPage.sortProductsBy('Name (Z to A)');
    const actualNames = await inventoryPage.getProductNames();

    expect(actualNames).toEqual(expectedNames);
    
});

test('sort products by name A to Z and verify names are in ascending order', async ({ inventoryPage }) => {

    const namesBeforeSort = await inventoryPage.getProductNames();
    const expectedNames = [...namesBeforeSort].sort();
    
    // sort the prduct by Name (A to Z)
    await inventoryPage.sortProductsBy('Name (A to Z)');
    const actualNames = await inventoryPage.getProductNames();

    expect(actualNames).toEqual(expectedNames);
    
});