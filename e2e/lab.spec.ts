import { test, expect } from "@playwright/test";

test("hero lab shows the name and the live dashboard", async ({ page }) => {
  await page.goto("/lab");
  await expect(page.getByRole("heading", { level: 1, name: "Ali Moradi" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Inspect all" })).toBeVisible();
});

test("inspector reports tokens and contrast", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: "Inspect all" }).click();
  await expect(page.getByText(/^Text .* AA pass$/).first()).toBeVisible();
  await expect(page.getByText(/^Graphics min .* AA pass$/).first()).toBeVisible();
});

test("theme controls switch the palette and mode", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("radio", { name: "Midnight theme" }).click();
  await expect(page).toHaveURL(/p=midnight/);
  await page.getByRole("switch", { name: "Dark mode" }).click();
  await expect(page).toHaveURL(/m=(dark|light)/);
});

test("trail shaders compile", async ({ page }) => {
  // The trail may be off in CI (no WebGL2, reduced motion), but a shader compile error is a bug.
  await page.goto("/lab");
  await page.waitForTimeout(500);
  const note = await page.locator(".trail").getAttribute("data-trail-note");
  expect(note ?? "").not.toContain("did not compile");
});
