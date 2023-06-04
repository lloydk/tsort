import { assert, test } from "vitest";
import { tsort, stronglyConnectedComponents } from "../src/tsort";

test("dag", () => {
  const g = new Map<number, number[]>();
  g.set(1, [2, 3]).set(2, [3]).set(3, []);
  const result = Array.from(
    tsort(g.keys(), (node: number) => {
      return g.get(node)!;
    })
  );
  assert.deepEqual(result, [3, 2, 1]);
});

test("cycle", () => {
  const g = new Map<number, number[]>();
  g.set(1, [2]).set(2, [3, 4]).set(3, [2]).set(4, []);

  let result = Array.from(
    stronglyConnectedComponents(g.keys(), (node: number) => {
      return g.get(node)!;
    })
  );
  assert.deepEqual(result, [[4], [2, 3], [1]]);

  assert.throws(() => {
    Array.from(
      tsort(g.keys(), (node: number) => {
        return g.get(node)!;
      })
    );
  }, "Cycle detected");
});

test("tarjan wikipedia example", () => {
  const g = new Map<number, number[]>();
  g.set(1, [3])
    .set(2, [1, 4])
    .set(3, [2, 4])
    .set(4, [5])
    .set(5, [4, 8])
    .set(6, [5, 7])
    .set(7, [8, 6])
    .set(8, []);

  const result = Array.from(
      stronglyConnectedComponents(g.keys(), (node: number) => {
        return g.get(node)!;
      })
    )
  assert.deepEqual(result, [[8], [4, 5], [1, 3, 2], [6, 7]]);
});

// https://github.com/bwesterb/py-tarjan
test("another example", () => {
  const g = new Map<number, number[]>();
  g.set(1, [2])
    .set(2, [1, 5])
    .set(3, [4])
    .set(4, [3, 5])
    .set(5, [6])
    .set(6, [7])
    .set(7, [8])
    .set(8, [6, 9])
    .set(9, []);

  const result = Array.from(
      stronglyConnectedComponents(g.keys(), (node: number) => {
        return g.get(node)!;
      })
    )
  assert.deepEqual(result, [[9], [6, 7, 8], [5], [1, 2], [3, 4]]);
});
