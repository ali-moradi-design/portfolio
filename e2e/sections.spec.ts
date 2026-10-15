import { test, expect } from "@playwright/test";

test("every menu link has a section", async ({ page }) => {
  await page.goto("/");
  for (const id of ["work", "experience", "skills", "about", "contact"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
});

test("dashboard builder adds and removes widgets", async ({ page }) => {
  await page.goto("/");
  const canvas = page.getByRole("figure", {
    name: "Working sample of the Dynamic dashboard builder",
  });
  const cards = canvas.locator("article");
  await expect(cards).toHaveCount(3);
  await canvas.getByRole("button", { name: "+ KPI" }).click();
  await expect(cards).toHaveCount(4);
  await canvas.getByRole("button", { name: "Remove Sessions" }).click();
  await expect(cards).toHaveCount(3);
});

test("form builder validates the generated form", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Generated form" });
  await form.getByRole("button", { name: "Submit" }).click();
  await expect(form.getByText("This field is required.")).toHaveCount(2);
  await form.getByLabel("Company").fill("Acme");
  await form.getByLabel("Work email").fill("team@acme.test");
  await form.getByLabel("Plan").selectOption("Team");
  await form.getByRole("button", { name: "Submit" }).click();
  await expect(form.getByText(/^Valid\./)).toBeVisible();
});

test("experience rows open one at a time", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#experience details");
  await expect(rows.first()).toHaveAttribute("open", "");
  await rows.nth(1).locator("summary").click();
  await expect(rows.nth(1)).toHaveAttribute("open", "");
  await expect(rows.first()).not.toHaveAttribute("open", "");
});

test("the CV downloads as a PDF", async ({ page, request }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: "Download CV" });
  await expect(link).toHaveAttribute("download", /\.pdf$/);
  const response = await request.get((await link.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});
