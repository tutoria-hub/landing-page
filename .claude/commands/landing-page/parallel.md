---
description: Set up parallel agent workflow for exploring 3 design/implementation approaches
allowed-tools: Bash(*), TodoWrite, Read, Edit
---

# Parallel Agent Exploration

Set up 3 parallel Claude Code instances to explore different approaches to the same task simultaneously.

## Task

**Explore 3 approaches for**: $ARGUMENTS

If no arguments: prompt user for the specific task to parallelize.

## When to Use This

Use parallel agents when:
- **Visual exploration**: 3+ design directions for same component
- **Performance strategies**: Multiple optimization paths need comparison
- **Layout options**: Uncertain which approach is best

DO NOT use parallel for:
- Bug fixes (one obvious solution)
- Performance audits (need consistent baseline)
- Code reviews (need one quality gate)
- Dependency upgrades (interdependent changes)

## Setup

1. **Verify dev server running**
   ```bash
   # Terminal 1 should already have:
   npm run dev
   # Keep running - never kill it
   ```

2. **Create 3 distinct approaches**
   - Break task into approaches A, B, C
   - Each must be independent and comparable
   - Example for "Redesign hero headline":
     - A: Gradient text effect
     - B: Animated underline on load
     - C: Hover glow effect

3. **Terminal setup**
   ```bash
   # Terminal 2: Agent A
   claude

   # Terminal 3: Agent B
   claude

   # Terminal 4: Agent C
   claude
   ```

4. **Agent prompts**
   - Provide specific, copy-pasteable prompts for each agent
   - Each edits the same file differently
   - Browser auto-refreshes on save (HMR)

5. **Comparison**
   - Screenshot each version
   - Evaluate: "Which achieves goal best?"
   - Pick winner
   - Git reset discards losers

6. **Ship**
   ```bash
   git add .
   git commit -m "feat: [winning approach description]"
   ```

## Output

Provide user with:
1. 3 specific agent prompts (A, B, C)
2. Comparison criteria specific to task
3. Git commit command for winner

## Time Estimate

~45 minutes for full exploration + comparison + commit
