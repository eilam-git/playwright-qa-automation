import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addBackpackButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addBackpackButton = page.locator(
      '#add-to-cart-sauce-labs-backpack'
    );

    this.cartLink = page.locator('.shopping_cart_link');

    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // Add backpack to cart
  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  // Open shopping cart
  async openCart() {
    await this.cartLink.click();
  }
}