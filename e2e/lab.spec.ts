import { test, expect } from "@playwright/test";

test("hero lab shows the combined hero and the photo variant", async ({ page }) => {
  await page.goto("/lab");
  await expect(page.getByRole("heading", { level: 1, name: "Ali Moradi" })).toBeVisible();

  await page.getByRole("button", { name: "D Combined with photo" }).click();
  await expect(page).toHaveURL(/v=d/);
  await expect(page.getByRole("img", { name: "Placeholder portrait" })).toBeVisible();
});

test("inspector reports tokens and contrast", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: "Inspect all" }).click();
  await expect(page.getByText(/AA pass/).first()).toBeVisible();
});

test("theme controls switch the palette and mode", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("radio", { name: "Midnight theme" }).click();
  await expect(page).toHaveURL(/p=midnight/);
  await page.getByRole("switch", { name: "Dark mode" }).click();
  await expect(page).toHaveURL(/m=(dark|light)/);
});
