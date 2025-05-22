import { test, expect } from '@playwright/test';

// Helper to generate a unique email for each test run
function uniqueEmail() {
  return `testuser+${Date.now()}@example.com`;
}

test('Signup and Email Verification Flow', async ({ page }) => {
  test.setTimeout(120000); // 2 minutes
  const email = 'yeehangchng@gmail.com';
  await page.goto('http://localhost:3000/signup');

  // Wait for the signup form to be visible
  await expect(page.locator('form')).toBeVisible();

  // Fill in the signup form
  await page.fill('input#email', email);
  await page.fill('input#password', 'Superdvd5');
  await page.fill('input#firstName', 'Leo');
  await page.fill('input#lastName', 'Chong');
  await page.fill('input#phone', '7308308');
  await page.click('button[type="submit"]');

  // Wait for the verification modal to appear
  await expect(page.getByText('Email Verification')).toBeVisible();

  // Here, you would need to manually enter the code you receive in your email
  // For demonstration, we'll pause so you can enter it
  await page.pause();

  // After entering the code, click verify
  // await page.click('button:has-text("Verify")');

  // Check for success message
  // await expect(page.getByText('Email verified!')).toBeVisible();

  // Test the resend code button
  // await page.click('button:has-text("Resend Code")');
  // await expect(page.getByText('Verification code resent!')).toBeVisible();
}); 