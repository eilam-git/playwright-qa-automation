import { test, expect } from '../fixtures/testFixtures';

test.describe('Shopping Cart Tests', () => {

  test('Add product to cart', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    page
  }) => {

    // Add product
    await productsPage.addBackpackToCart();

    // Verify cart badge
    await expect(productsPage.cartBadge).toHaveText('1');

    // Open cart
    await productsPage.openCart();

    // Verify cart page
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify product
    await expect(cartPage.backpackName).toBeVisible();
  });

  test('Remove product from cart', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    page
  }) => {

    // Add product
    await productsPage.addBackpackToCart();

    await expect(productsPage.cartBadge).toHaveText('1');

    // Open cart
    await productsPage.openCart();

    await expect(page).toHaveURL(/\/cart\.html$/);

    // Remove product
    await cartPage.removeBackpack();

    // Verify cart is empty
    await expect(cartPage.cartItems).toHaveCount(0);

    // Verify cart badge disappeared
    await expect(cartPage.cartBadge).toBeHidden();
  });

});
