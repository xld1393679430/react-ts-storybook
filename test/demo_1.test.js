// describe("测试Demo", function() {

// })

test("第一个测试 toBe", function () {
  expect(1 + 1).toBe(2);
});

test("第二个测试 not.toBe", function () {
  expect(1 + 1).not.toBe(3);
});

test("第三个测试 Boolean", function () {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("第四个测试 比较大小", function () {
  // 4比3大
  expect(4).toBeGreaterThan(3);
  // 2比3小
  expect(2).toBeLessThan(3);
});

test("第五个测试 比较对象", function () {
  expect({ name: "aaa" }).toEqual({ name: "aaa" });
});
