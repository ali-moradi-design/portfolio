import { test, expect } from "@playwright/test";

test("hero lab switches between the three variants", async ({ page }) => {
  await page.goto("/lab");
  await expect(page.getByRole("heading", { level: 1, name: "Ali Moradi" })).toBeVisible();

  await page.getByRole("button", { name: "Halftone trail" }).click();
  await expect(page).toHaveURL(/v=b/);
  await expect(page.getByRole("heading", { level: 1, name: "I build dashboards for big data" })).toBeVisible();

  await page.getByRole("button", { name: "Combined" }).click();
  await expect(page).toHaveURL(/v=c/);
  await expect(page.getByRole("button", { name: "Inspect all" })).toBeVisible();
});

test("inspector reports tokens and contrast", async ({ page }) => {
  await page.goto("/lab?v=a");
  await page.getByRole("button", { name: "Inspect all" }).click();
  await expect(page.getByText(/AA pass/).first()).toBeVisible();
});
