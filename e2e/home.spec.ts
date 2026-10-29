import { test, expect } from "@playwright/test";

test("home page shows the name and the live dashboard", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(/Ali Moradi/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Ali Moradi" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Inspect all" })).toBeVisible();
});

test("menu links to the sections", async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto("/");
  const menu = page.getByRole("navigation", { name: "Primary" });
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    menu.getByRole("link", { name: "Work" }).first(),
  ).toHaveAttribute("href", "/#work");
  await expect(menu.getByRole("link", { name: "Projects" })).toHaveAttribute(
    "href",
    "/projects",
  );
});

test("inspector reports tokens and contrast", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Inspect all" }).click();
  await expect(
    page.getByText(/^Text contrast .* WCAG AA pass$/).first(),
  ).toBeVisible();
  await expect(page.getByText(/^\d+\.\d{2}:1$/).first()).toBeVisible();
});

test("theme controls switch the palette and mode and remember them", async ({
  page,
}) => {
  await page.goto("/");
  const html = page.locator("html");
  await page.getByRole("radio", { name: "Midnight theme" }).click();
  await expect(html).toHaveAttribute("data-palette", "midnight");
  const before = await page
    .getByRole("switch", { name: "Dark mode" })
    .getAttribute("aria-checked");
  await page.getByRole("switch", { name: "Dark mode" }).click();
  await expect(html).toHaveAttribute(
    "data-mode",
    before === "true" ? "light" : "dark",
  );
  await page.reload();
  await expect(html).toHaveAttribute("data-palette", "midnight");
});

test("trail shaders compile", async ({ page }) => {
  // The trail may be off in CI (no WebGL2, reduced motion), but a shader compile error is a bug.
  await page.goto("/");
  await page.waitForTimeout(500);
  const note = await page
    .locator("[data-trail]")
    .getAttribute("data-trail-note");
  expect(note ?? "").not.toContain("did not compile");
});
