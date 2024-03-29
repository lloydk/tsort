/**
 * A module for topological sorting and strongly connected components.
 * This is a port of the Ruby language TSort module (https://github.com/ruby/ruby/blob/master/lib/tsort.rb).
 * See the BSDL file for license information.
 */
/**
 * Performs a topological sort of the given nodes.
 *
 * @param nodes - an `Iterable` of nodes to sort
 * @param children - a function that takes a node and returns an `Iterable` for the children of the node
 * @returns a `Generator` that yields the nodes in topological order
 * @throws `Error` if a cycle is detected
 *
 * @example
 * Iterate over the sorted nodes and log them to the console:
 * ```ts
 * const g = new Map<number, number[]>();
 * g.set(1, [2, 3]).set(2, [3]).set(3, []);
 * const i = tsort(g.keys(), (node) => { return g.get(node)! })
 * for (const node of i) { console.log(node); }
 * // Prints:
 * // 3
 * // 2
 * // 1
 * ```
 * @example
 * Create an array from the sorted nodes and log the array to the console:
 * ```ts
 * const g = new Map<number, number[]>();
 * g.set(1, [2, 3]).set(2, [3]).set(3, []);
 * const sorted = Array.from(tsort(g.keys(), (node) => { return g.get(node)! }))
 * console.log(sorted);
 * // Prints:
 * // [3, 2, 1]
 * ```
 * @example
 * Cycle detection:
 * ```ts
 * const g = new Map<number, number[]>();
 * g.set(1, [2]).set(2, [3, 4]).set(3, [2]).set(4, []);
 * const i = tsort(g.keys(), (node) => { return g.get(node)! })
 * // Thows an Error: Cycle detected
 * ```
 */
export declare function tsort<T>(nodes: Iterable<T>, children: (node: T) => Iterable<T>): Generator<T, void>;
/**
 * Returns the strongly connected components of the given nodes.
 *
 * @param nodes - an `Iterable` of nodes to sort
 * @param children - a function that takes a node and returns an `Iterable` for the children of the node
 * @returns a `Generator` that yields each strongly connected component as an `Array` of nodes
 *
 * @example
 * Iterate over each strongly connected component and log the strongly connected component to the console
 * ```ts
 * const g = new Map<number, number[]>();
 *   g.set(1, [2])
 *   .set(2, [1, 5])
 *   .set(3, [4])
 *   .set(4, [3, 5])
 *   .set(5, [6])
 *   .set(6, [7])
 *   .set(7, [8])
 *   .set(8, [6, 9])
 *   .set(9, []);
 * const i = stronglyConnectedComponents(g.keys(), (node) => { return g.get(node)! })
 * for (const node of i) { console.log(node); }
 * // Prints:
 *
 * // [9]
 * // [6, 7, 8]
 * // [5]
 * // [1, 2]
 * // [3, 4]
 * ```
 */
export declare function stronglyConnectedComponents<T>(nodes: Iterable<T>, children: (node: T) => Iterable<T>): Generator<T[], void>;
