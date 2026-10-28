import { test, expect } from '../fixtures/testFixtures';
import { checkoutData } from '../test-data/users';

test.describe('Checkout E2E Tests', () => {

  test('Complete purchase successfully', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    page
  }) => {
    await productsPage.addBackpackToCart();
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.openCart();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.backpackName).toBeVisible();

    await cartPage.startCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    await checkoutPage.fillCustomerInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    await expect(checkoutPage.orderProductName)
      .toHaveText('Sauce Labs Backpack');

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);

    await expect(checkoutPage.confirmationMessage)
      .toHaveText('Thank you for your order!');
  });

  test('Checkout fails when first name is missing', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    page
  }) => {
    await productsPage.addBackpackToCart();
    await productsPage.openCart();
    await cartPage.startCheckout();

    await checkoutPage.fillCustomerInformation(
      '',
      'Automation',
      '12345'
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('Checkout fails when last name is missing', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    page
  }) => {
    await productsPage.addBackpackToCart();
    await productsPage.openCart();
    await cartPage.startCheckout();

    await checkoutPage.fillCustomerInformation(
      'Eilam',
      '',
      '12345'
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('Last Name is required');

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('Checkout fails when postal code is missing', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    page
  }) => {
    await productsPage.addBackpackToCart();
    await productsPage.openCart();
    await cartPage.startCheckout();

    await checkoutPage.fillCustomerInformation(
      'Eilam',
      'Automation',
      ''
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('Postal Code is required');

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

});
