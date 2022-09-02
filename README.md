# tsort

tsort is a Typescript port of the [Ruby TSort module](https://github.com/ruby/ruby/blob/master/lib/tsort.rb).

The shape of the graph is defined by the `node` and `children` parameters passed to the `tsort` or `stronglyConnectedComponents` functions.

## Installation

```sh
npm install @lloydk/tsort

yarn add @lloydk/tsort

pnpm add @lloydk/tsort

```

## Usage
Sort a graph and iterate over the sorted nodes and log them to the console:
```ts
const g = new Map<number, number[]>();
g.set(1, [2, 3]).set(2, [3]).set(3, []);
const i = tsort(g.keys(), (node) => { return g.get(node)! })
for (const node of i) { console.log(node); }
// Prints:
// 3
// 2
// 1
```
Create an array from the sorted nodes and log the array to the console:
```ts
const g = new Map<number, number[]>();
g.set(1, [2, 3]).set(2, [3]).set(3, []);
const sorted = Array.from(tsort(g.keys(), (node) => { return g.get(node)! }))
console.log(sorted);
// Prints:
// [3, 2, 1]
```
Cycle detection:
```ts
const g = new Map<number, number[]>();
g.set(1, [2]).set(2, [3, 4]).set(3, [2]).set(4, []);
const i = tsort(g.keys(), (node) => { return g.get(node)! })
// Thows an Error: Cycle detected
```




Iterate over each strongly connected component of a graph and log each strongly connected component to the console
```ts
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
const i = stronglyConnectedComponents(g.keys(), (node) => { return g.get(node)! })
for (const node of i) { console.log(node); }
// Prints:
// [9]
// [6, 7, 8]
// [5]
// [1, 2]
// [3, 4]
 ```


## License

See the [BSDL](./BSDL) file for license information.
