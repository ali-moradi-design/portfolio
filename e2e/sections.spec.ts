import { test, expect } from "@playwright/test";

test("every menu link has a section", async ({ page }) => {
  await page.goto("/");
  for (const id of ["work", "experience", "skills", "about", "contact"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
});

test("home shows featured projects and links to all of them", async ({
  page,
}) => {
  await page.goto("/");
  const work = page.locator("#work");
  await expect(work.locator("article")).not.toHaveCount(0);
  await expect(
    work.getByRole("link", { name: /Open live/ }).first(),
  ).toHaveAttribute("href", /^https:\/\/[a-z0-9-]+\.ali-moradi-develop\.com$/);
  await work.getByRole("link", { name: /Browse every project/ }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
});

test("projects page filters by type and tech through the URL", async ({
  page,
}) => {
  await page.goto("/projects");
  const rows = page.locator("main article");
  const total = await rows.count();
  expect(total).toBeGreaterThan(1);

  const types = page.getByRole("group", { name: "Type" });
  await types.getByRole("button", { name: /^Dashboard/ }).click();
  await expect(page).toHaveURL(/type=dashboard/);
  const dashboards = await rows.count();
  expect(dashboards).toBeLessThan(total);

  await page.reload();
  await expect(rows).toHaveCount(dashboards);
  await expect(
    types.getByRole("button", { name: /^Dashboard/ }),
  ).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Clear all" }).click();
  await expect(rows).toHaveCount(total);
  await expect(page).toHaveURL(/\/projects$/);
});

test("Neor's work samples sit in its experience row", async ({ page }) => {
  await page.goto("/");
  const neor = page.locator("#experience details").first();
  const builder = neor.getByRole("figure", {
    name: "Working sample of the Dynamic dashboard builder",
  });
  const cards = builder.locator("article");
  await expect(cards).toHaveCount(3);
  await builder.getByRole("button", { name: "+ KPI" }).click();
  await expect(cards).toHaveCount(4);

  await neor.getByRole("tab", { name: "Dynamic form builder" }).click();
  const form = neor.getByRole("form", { name: "Generated form" });
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
