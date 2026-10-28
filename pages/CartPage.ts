import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly backpackName: Locator;
  readonly removeBackpackButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');

    this.backpackName = page.locator(
      '.cart_item .inventory_item_name',
      { hasText: 'Sauce Labs Backpack' }
    );

    this.removeBackpackButton = page.locator(
      '#remove-sauce-labs-backpack'
    );

    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }
  
  // Start checkout process
async startCheckout() {
  await this.page.locator('#checkout').click();
} 
}
