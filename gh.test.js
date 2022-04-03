let page;
let url;
async function findTitle(url) {
  await page.goto(url);
  await page.waitForSelector('h1');
  const title = await page.title();
  return title;
};

beforeEach(async () => {
  page = await browser.newPage();

});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 30000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 30000);
});

test("Marketplace page", async () => {
  url = await "https://github.com/marketplace";
  const title = await findTitle(url);
  expect(title).toEqual('GitHub Marketplace · to improve your workflow · GitHub');
}, 30000);
test("Education page", async () => {
  url = await "https://education.github.com";
  const title = await findTitle(url);
  expect(title).toEqual('Engaged students are the result of using real-world tools - GitHub Education');
}, 30000);
test("Security page", async () => {
  url = await "https://github.com/features/security";
  const title = await findTitle(url);
  expect(title).toEqual('Features · Security · GitHub');
}, 30000);