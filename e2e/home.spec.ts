import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);

  await expect(page).toHaveTitle(/Ali Moradi/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("menu opens and shows section links", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();

  const menu = page.getByRole("navigation", { name: "Primary" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Work" })).toHaveAttribute(
    "href",
    "#work",
  );

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});
