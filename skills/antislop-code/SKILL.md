---
name: antislop-code
description: "Code comment hygiene for AI coding agents: remove generic AI-slop comments, keep the valuable ones, never touch the code."
allowed-tools: Read Write Edit Glob Grep
---
# antislop-code

> Anti Slop: Rules for AI Coding Agents. Code Comments skill

> Part of the antislop system. Read together with `antislop.md` (the core). This skill filters comments that read as generically AI (decorative, restating the obvious, stiff, loud) while preserving the comments that carry real information. It references core rules by number and never duplicates or renumbers them. Load it when the task writes or edits code comments.

## How to use this skill

- Load together with `antislop.md` whenever the task touches code comments. The core holds the mechanism (the purpose test, the three tiers, the Delivery Gate); this skill holds comment-specific depth.
- Every entry has the same shape: **Tell** (the pattern), **Why** (why it reads as slop), **Fix** (what to do instead), with the governing core rule cited as R-XX.
- **Scope guardrail:** this skill only modifies comments. Never modify executable code, identifiers, imports, formatting, indentation, whitespace, control flow, or logic. When in doubt, leave the code untouched.
- The Delivery Gate in the core remains the gate. The "Code Comment Checklist" at the end of this file is the comment-specific supplement to run alongside it.

## Comments That Add Nothing

### Decorative Separators

- **Tell:** banner comments built from repeated characters, ALL CAPS labels, or box drawing around a section name: `// =======================` around `Authentication`, `// -------- WORKFLOW --------`, or a `/* ---- ROUTES ---- */` header.
- **Why:** the decoration is the message. A label wrapped in `=` or `-` signals "AI made this" without adding information, and ALL CAPS reads as shouting.
- **Fix:** replace with a single plain line, or remove entirely if the label adds nothing (R-31).

### Restating the Obvious

- **Tell:** a comment that repeats what the next line or declaration already shows, like `// Initialize the variable` above `let count = 0`, `// User class` above `class User {}`, `// Validate user` above `function validateUser()`, or `const userAge = 25; // User age is 25`.
- **Why:** it doubles the reading load without adding anything. The code already says it; the comment just repeats it.
- **Fix:** remove and leave the line of code alone.

### Workflow Narration

- **Tell:** comments that narrate the flow step by step, like `// Step 1: Validate input`, `// Step 2: Process request`, `// Step 3: Return response`, or `// First...`, `// Next...`, `// Finally...`.
- **Why:** the control flow is visible in the code itself. Numbering it reads as a checklist, not an explanation.
- **Fix:** remove. If the flow is genuinely hard to follow, that is a structure problem, not a missing comment problem.

### Empty Labels

- **Tell:** generic labels with no information behind them: `// Main logic`, `// Core logic`, `// Business logic`, `// Helper function`, `// Entry point`, `// Error handling`, or `// Note: This is important.` / `// Important: Please read.`
- **Why:** the label names a category, not a fact. "Main logic" tells the reader nothing they could not infer from the code.
- **Fix:** remove unless the label carries specific information. "Note: retries happen only on 5xx" earns its place; "Note: this is important" does not.

### Vague Placeholders

- **Tell:** comments that promise future work without saying what: `// TODO: Improve this`, `// Future improvements`, `// Additional optimization can be added here`, `// Add more validation`.
- **Why:** a vague TODO is noise. It names a feeling (this could be better) instead of a task (what, and why).
- **Fix:** remove. Keep a TODO only when it names a specific task with enough context to act on.

### Signature Echo

- **Tell:** documentation that only restates the signature, like a JSDoc block that repeats `@param price The price.` and `@returns Total price.` for a function whose name and parameters already say all of it.
- **Why:** docs that echo the signature add length, not understanding. The reader learns nothing new.
- **Fix:** simplify or remove the echo. Keep documentation that explains business rules, edge cases, assumptions, algorithms, limitations, side effects, API behavior, or security implications. Never strip real documentation.

### Decorative Emoji

- **Tell:** emoji used as decoration in comments, like `// ✅ Validation` or `// 🚀 Performance`.
- **Why:** emoji is visual noise in code, and the specific set (✅, 🚀, 🔒) is the AI default vocabulary.
- **Fix:** replace with plain English, or remove if the label adds nothing.

### End Markers

- **Tell:** comments that only mark the end of a block, like `} // end if`, `# End of function`, or `// End processOrder`.
- **Why:** the closing brace already ends the block. The marker exists out of habit, not need.
- **Fix:** remove. In the rare case an end marker genuinely helps a long file, keep it only where it prevents confusion, not as a habit.

## How It Should Read

### Line-by-Line Narration

- **Tell:** a comment on every trivial statement, narrating each line as it is written: `// Initialize count`, then `// Loop items`, then `// Get item`, then `// Increment`, then `// Return result`.
- **Why:** when every line is commented, none of the comments matter. The reader has to check each one to find the one that carries meaning.
- **Fix:** write one concise comment per logical block instead of one per line. If the block needs no comment, write none.

### Stiff or Loud Wording

- **Tell:** comments that sound formal, long, or shout: "This function is responsible for validating whether the supplied credentials are valid before continuing with the authentication process", or `// MAIN LOGIC` in caps.
- **Why:** formal and loud wording reads as generated, not as an engineer leaving a note for the next person.
- **Fix:** write short, sentence-case lines in a natural developer voice: `// Validate credentials before issuing a token.` Good comments explain why, not what, and they stay short.

## Not a Ban (preserve these)

Never remove comments that explain:

- business logic and intent
- architectural decisions
- security considerations
- performance trade-offs
- concurrency behavior
- protocol details
- API contracts
- workarounds
- edge cases and assumptions
- licensing and legal notices

Example that must stay:

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

A comment earns its place when it explains something the code does not already show: the reason, the constraint, the non-obvious behavior.

## Code Comment Checklist

Run these alongside the core Delivery Gate when the task touches comments. All answers must be **yes**:

- [ ] Does every comment add information the code does not already show? (R-31)
- [ ] Do the comments avoid decorative separators, ALL CAPS banners, and box-drawn headers?
- [ ] Do the comments avoid restating the obvious line, declaration, or signature?
- [ ] Do the comments avoid step-by-step workflow narration?
- [ ] Do the comments avoid empty labels and vague TODOs that name no task?
- [ ] Do the comments avoid decorative emoji and end markers?
- [ ] Is the comment density one per logical block, not one per line?
- [ ] Do the remaining comments read short, natural, and in sentence case?
- [ ] Is the scope guardrail held: only comments changed, the code untouched?
