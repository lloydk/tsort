import { tsort } from '.';
import { stronglyConnectedComponents } from '.';

test('dag', () => {
  const g = new Map<number, number[]>();
  g.set(1, [2, 3]).set(2, [3]).set(3, []);
  expect(
    Array.from(
      tsort(g.keys(), (node) => {
        return g.get(node)!;
      }),
    ),
  ).toEqual([3, 2, 1]);
});

test('cycle', () => {
  const g = new Map<number, number[]>();
  g.set(1, [2]).set(2, [3, 4]).set(3, [2]).set(4, []);

  expect(
    Array.from(
      stronglyConnectedComponents(g.keys(), (node) => {
        return g.get(node)!;
      }),
    ),
  ).toEqual([[4], [2, 3], [1]]);
  expect(() => {
    Array.from(
      tsort(g.keys(), (node) => {
        return g.get(node)!;
      }),
    );
  }).toThrowError('Cycle detected');
});

test('tarjan wikipedia example', () => {
  const g = new Map<number, number[]>();
  g.set(1, [3])
    .set(2, [1, 4])
    .set(3, [2, 4])
    .set(4, [5])
    .set(5, [4, 8])
    .set(6, [5, 7])
    .set(7, [8, 6])
    .set(8, []);

  expect(
    Array.from(
      stronglyConnectedComponents(g.keys(), (node) => {
        return g.get(node)!;
      }),
    ),
  ).toEqual([[8], [4, 5], [1, 3, 2], [6, 7]]);
});

// https://github.com/bwesterb/py-tarjan
test('another example', () => {
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

  expect(
    Array.from(
      stronglyConnectedComponents(g.keys(), (node) => {
        return g.get(node)!;
      }),
    ),
  ).toEqual([[9], [6, 7, 8], [5], [1, 2], [3, 4]]);
});
