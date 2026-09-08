// src/basics.ts
//
// Evening 1 lab: the TypeScript you need before you write a single line of
// agent code. Nothing here calls an LLM — that's tomorrow (w1-first-call).
// Today is just: typed variables, inference, typed functions, string
// operations, and template literals. Run it with `pnpm basics`.

// --- Variables and primitive types ---
// A type annotation (`: string`) is a promise: "this variable will only
// ever hold a string." TypeScript checks that promise at compile time, so
// a mistake (assigning a number here, say) is caught before the program
// ever runs — not discovered later as a runtime bug.
const bootcampName: string = "Bootcamp 1 — Foundations";
let weekNumber: number = 1;
const isLiveSession: boolean = true;

// --- Type inference: TypeScript often figures out the type for you ---
// No annotation here, but `seats` is still fully typed — TypeScript reads
// the literal `20` and infers `number`. Try hovering over `seats` in your
// editor: it will show `const seats: number`. You don't have to annotate
// everything; inference handles the obvious cases, so most annotations
// belong at function boundaries (see `greet` below), not on every line.
const seats = 20;

// --- A typed function: typed parameters, typed return value ---
// `name: string` types the input; `: string` after the parentheses types
// what the function hands back. If you tried to `return 42` here instead
// of a template string, TypeScript would refuse to compile.
function greet(name: string): string {
  return `Welcome to ${bootcampName}, ${name}!`;
}

// --- String operations ---
// Strings come with built-in methods for the things you do to text
// constantly: change case, measure length, search, split apart.
const topic = "agentic ai";
console.log(topic.toUpperCase()); // "AGENTIC AI"
console.log(topic.length); // 10
console.log(topic.includes("ai")); // true
console.log(topic.split(" ")); // ["agentic", "ai"]

// --- Template literals ---
// Backticks (`) let you embed expressions directly in a string with
// ${...} — no more gluing strings together with +. This is how you'll
// build every prompt you send an LLM from here on.
console.log(`Week ${weekNumber} of 4 — live: ${isLiveSession}`);

console.log(greet("Priya"));
console.log(`Seats available: ${seats}`);

// ---------------------------------------------------------------------
// Guided exercises — write these yourself, below this line.
// Uncomment each one as you go; the file must still run with the rest
// left as comments (leaving all three commented out is a valid starting
// state — don't delete them).
// ---------------------------------------------------------------------

// 1. Declare a `const yourName: string` holding your own name, then call
//    `greet(yourName)` and log the result.
//
// const yourName: string = "";
// console.log(greet(yourName));

// 2. Write a function `weeksLeft(currentWeek: number): number` that
//    returns how many weeks remain in this 4-week bootcamp (Bootcamp 1
//    runs weeks 1 through 4). Call it with `weekNumber` and log the
//    result.
//
// function weeksLeft(currentWeek: number): number {
//   // your code here
// }
// console.log(weeksLeft(weekNumber));

// 3. Take the string "learn build ship" and print it with each word
//    capitalised (e.g. "Learn Build Ship"). Hint: `split(" ")` gives you
//    an array of words; you'll need to change the first letter of each
//    one and join them back together.
//
// const phrase = "learn build ship";
// // your code here
