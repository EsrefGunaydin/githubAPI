const { getCommits, getPullRequests } = require("./utilities");

test("should print commits url addresses", () => {
  expect(getCommits()).toBe({});
});

test("should print pulls and commit numbers", () => {
  expect(getPullRequests()).toBe({
    title: "Improve refine with type guards",
    url: "https://api.github.com/repos/colinhacks/zod/pulls/727",
    id: 765128574,
    numberOfCommits: 1,
  });
});
