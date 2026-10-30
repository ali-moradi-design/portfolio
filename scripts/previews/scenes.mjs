// What each preview shows. `setup` runs before recording starts (sign-in,
// first page); `play` is the recorded part, about 8 to 10 seconds. Scenes only
// look around: nothing is sent or bought, and `cleanup` undoes any edit.

const site = (sub) => `https://${sub}.ali-moradi-develop.com`;

/** @type {{ slug: string, url: string, colorScheme?: "light" | "dark", settle?: number, setup?: Function, play: Function, cleanup?: Function, speed?: number }[]} */
export const scenes = [
  {
    slug: "aml-dashboard",
    url: `${site("aml-dashboard")}/en/login`,
    settle: 5000,
    async setup(page) {
      await page.getByRole("button", { name: /Analyst/ }).click();
      await page.getByRole("button", { name: "Sign in", exact: true }).click();
      await page.waitForURL((u) => !u.pathname.includes("login"));
      await page.waitForLoadState("networkidle");
    },
    async play(page, h) {
      await h.wait(800);
      await h.scroll(500, 1600);
      await h.wait(600);
      await h.go(page.getByRole("link", { name: /^Alerts/ }), async () => {
        await page.locator("table tbody tr").nth(8).waitFor();
        await page.waitForLoadState("networkidle");
      });
      await h.wait(800);
      await h.hover(page.locator("table tbody tr").nth(3));
      await h.wait(400);
      await h.hover(page.locator("table tbody tr").nth(7), 40);
      await h.wait(400);
      await h.go(page.getByRole("link", { name: "Reports" }), async () => {
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(3000);
      });
      await h.wait(800);
      await page.mouse.move(760, 450, { steps: 20 });
      await h.scroll(600, 1800);
      await h.wait(1500);
    },
  },
  {
    slug: "dashboard-builder",
    url: `${site("dashboard-builder")}/d/sample-sales`,
    settle: 5000,
    async play(page, h) {
      await h.wait(1200);
      await h.go(page.getByText("Edit", { exact: true }).first(), async () => {
        await page.waitForURL(/\/edit/);
        await page.waitForTimeout(2500);
      });
      await h.wait(500);
      // Select widgets so the settings panel fills, then open the query builder.
      await h.click(
        page.getByText("Revenue by month", { exact: true }).first(),
      );
      await h.wait(1500);
      await h.click(
        page.getByText("Share by category", { exact: true }).first(),
      );
      await h.wait(1300);
      await h.click(page.getByRole("button", { name: "Edit query" }));
      await h.wait(2500);
    },
  },
  {
    slug: "formcanvas",
    url: `${site("formcanvas")}/sign-in`,
    settle: 2000,
    async setup(page) {
      await page.getByRole("button", { name: /Try the demo account/ }).click();
      await page.waitForURL(/\/forms/);
      await page.waitForLoadState("networkidle");
      // The builder of the sample form with the most field types.
      await page.getByRole("link", { name: /^Product feedback/ }).click();
      await page.waitForLoadState("networkidle");
    },
    async play(page, h) {
      await h.wait(800);
      // Select a question, add a rating after it and give it a label.
      await h.click(page.getByRole("button", { name: /^plan \(Question/ }));
      await h.wait(1200);
      await h.hover(page.getByRole("button", { name: "Add Number" }), 20);
      await h.wait(300);
      await h.click(page.getByRole("button", { name: "Add Rating" }));
      await h.wait(900);
      const label = page.locator("input[name=label_en]");
      await h.click(label);
      await label.fill("");
      await label.pressSequentially("How was your onboarding?", { delay: 55 });
      await h.wait(500);
      await h.click(page.locator("input[name=required]"));
      await h.wait(700);
      await h.hover(page.getByText("How was your onboarding?").first());
      await h.wait(1500);
    },
    async cleanup(page) {
      // The demo form autosaves: delete the added question again.
      const added = page.getByRole("button", { name: /^rating\w* \(Question/ });
      while (await added.count()) {
        await added.first().click();
        await page
          .getByRole("button", { name: "Delete", exact: true })
          .first()
          .click();
        await page.waitForTimeout(1500);
      }
    },
  },
  {
    slug: "pixelbits",
    url: site("pixelbits"),
    colorScheme: "dark",
    async play(page, h) {
      await h.wait(1500);
      await h.hover(page.getByRole("link", { name: "BROWSE COMPONENTS" }));
      await h.wait(800);
      await h.go(page.getByRole("link", { name: "GET STARTED" }), async () => {
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(800);
      });
      await h.wait(1500);
      await page.mouse.move(760, 450, { steps: 20 });
      await h.scroll(600, 2000);
      await h.wait(1500);
    },
  },
  {
    slug: "crypto-dashboard",
    url: `${site("crypto-dashboard")}/en/BTC_USDT`,
    colorScheme: "dark",
    settle: 3000,
    async play(page, h) {
      await h.wait(3000);
      await h.click(page.getByText("ETH/USDT").first());
      await h.wait(4000);
    },
  },
  {
    slug: "team-chat",
    url: site("team-chat"),
    colorScheme: "dark",
    async setup(page) {
      await page.getByRole("button", { name: /Explore as admin/ }).click();
      await page.waitForURL(/\/c\//);
      await page.waitForLoadState("networkidle");
      // A channel whose messages are all in English.
      await page.getByRole("link", { name: /^launch-2026/ }).click();
      await page.waitForLoadState("networkidle");
    },
    async play(page, h) {
      await h.wait(800);
      await h.hover(page.getByText("Launch checklist"));
      await h.wait(800);
      await h.hover(page.getByText(/load test results/));
      await h.wait(800);
      const box = page.getByRole("textbox").last();
      await h.click(box);
      await box.pressSequentially(
        "Preview videos are live on the portfolio 🎬",
        {
          delay: 45,
        },
      );
      await h.wait(1500);
      await box.fill("");
      await h.wait(300);
    },
  },
  {
    slug: "shop-books",
    url: site("shop-books"),
    async play(page, h) {
      await h.wait(600);
      await h.scroll(900, 2500);
      await h.wait(600);
      await h.scroll(900, 2500);
      await h.wait(800);
    },
  },
  {
    slug: "leather-shop",
    url: site("shop-leather"),
    async play(page, h) {
      await h.wait(800);
      await h.hover(page.getByRole("button", { name: /^Men/ }).first());
      await h.wait(1500);
      await page.mouse.move(640, 600, { steps: 20 });
      await h.scroll(1000, 3000);
      await h.wait(1000);
    },
  },
  {
    slug: "shop-tools",
    url: site("shop-tools"),
    async play(page, h) {
      await h.wait(600);
      await h.scroll(800, 2400);
      await h.wait(600);
      await h.scroll(800, 2400);
      await h.wait(800);
    },
  },
  {
    slug: "arvand-company",
    url: `${site("arvand-company")}/en/`,
    async play(page, h) {
      await h.wait(800);
      await h.scroll(900, 2600);
      await h.wait(600);
      await h.scroll(900, 2600);
      await h.wait(800);
    },
  },
  {
    slug: "cafe-hoor",
    url: `${site("cafe-hoor")}/en/`,
    colorScheme: "dark",
    settle: 2500,
    async play(page, h) {
      await h.wait(1500);
      await h.scroll(800, 2600);
      await h.wait(800);
      await h.scroll(800, 2600);
      await h.wait(800);
    },
  },
  {
    slug: "aat-company",
    url: site("aat-company"),
    settle: 2500,
    async play(page, h) {
      await h.wait(1000);
      await h.scroll(1000, 3000);
      await h.wait(600);
      await h.scroll(1000, 3000);
      await h.wait(800);
    },
  },
  {
    slug: "pulsefit",
    url: site("pulsefit"),
    async play(page, h) {
      await h.wait(800);
      for (const tab of ["Workout", "Diet", "Progress", "Today"]) {
        await h.click(page.getByRole("link", { name: tab, exact: true }));
        await h.wait(1300);
      }
    },
  },
  {
    slug: "3d-configurator",
    url: `${site("3d-configurator")}/#configurator`,
    settle: 8000,
    speed: 2.2,
    async play(page, h) {
      await h.wait(600);
      for (const name of ["Beach", "Street", "Coral", "Soft sheen +$8"]) {
        await h.click(
          page
            .getByRole("button", { name, exact: true })
            .or(page.getByRole("radio", { name, exact: true }))
            .first(),
        );
        await h.wait(1100);
      }
    },
  },
  {
    slug: "3d-furniture-ar",
    url: site("3d-furniture-ar"),
    async play(page, h) {
      await h.wait(600);
      await h.go(
        page.getByRole("link", { name: /Marlow Lounge Chair/ }).first(),
        async () => {
          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(3000);
        },
      );
      await h.wait(800);
      const viewer = page.locator("model-viewer").first();
      const box = await viewer.boundingBox();
      if (box) {
        const y = box.y + box.height / 2;
        await page.mouse.move(box.x + box.width * 0.35, y, { steps: 10 });
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.7, y, { steps: 60 });
        await page.mouse.up();
      }
      await h.wait(1500);
    },
  },
];
