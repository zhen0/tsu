# tsutils

TypeScript command line utilities package.

## Setup

This project uses:
- **pnpm** for package management
- **TypeScript** with ESM modules
- **Commander.js** for CLI functionality
- **Vitest** for testing
- **ESLint** for linting
- **Prettier** for code formatting

## Installation

```bash
pnpm install
```

## Development

```bash
# Build the project
pnpm build

# Watch mode for development
pnpm dev

# Run tests
pnpm test

# Run tests once
pnpm test:run

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check without emitting
pnpm typecheck
```

## Usage

After building, you can run the CLI:

```bash
# Greet someone
node dist/cli.js greet World

# Greet in uppercase
node dist/cli.js greet World --uppercase

# Check if current directory is in a git repository
node dist/cli.js git-check

# Check if a specific path is in a git repository
node dist/cli.js git-check /path/to/directory

# Show files changed compared to main branch (default)
node dist/cli.js git-changed

# Show files changed compared to a specific branch
node dist/cli.js git-changed --base-branch develop

# Show only staged changes
node dist/cli.js git-changed --staged

# Show only unstaged changes
node dist/cli.js git-changed --unstaged
```

Or if you've linked the package globally (`pnpm link --global`):

```bash
tsutils greet World
tsutils git-check
tsutils git-changed
tsutils git-changed --staged
```

### Available Utilities

You can also import utilities directly in your TypeScript/JavaScript projects:

```typescript
import { isGitRepo, getGitRoot, getChangedFiles, getCurrentBranch } from 'tsutils';

// Check if current directory is in a git repo
if (isGitRepo()) {
  console.log('Git root:', getGitRoot());
}

// Check a specific directory
if (isGitRepo('/some/path')) {
  console.log('It is a git repo!');
}

// Get current branch name
const branch = getCurrentBranch();
console.log('Current branch:', branch);

// Get committed changes compared to main
const committedFiles = getChangedFiles({ type: 'committed', baseBranch: 'main' });
console.log('Changed files:', committedFiles);

// Get staged changes
const stagedFiles = getChangedFiles({ type: 'staged' });
console.log('Staged files:', stagedFiles);

// Get unstaged changes
const unstagedFiles = getChangedFiles({ type: 'unstaged' });
console.log('Unstaged files:', unstagedFiles);
```

## Project Structure

```
src/
├── cli.ts              # CLI entry point
├── index.ts            # Library exports
├── commands/           # CLI commands
│   ├── greet.ts
│   ├── greet.test.ts
│   ├── git-check.ts
│   └── git-changed.ts
└── utils/              # Utility functions
    ├── logger.ts
    ├── git.ts          # Git utilities (isGitRepo, getGitRoot, getChangedFiles, getCurrentBranch)
    └── git.test.ts
```

## Adding New Commands

1. Create a new file in `src/commands/`
2. Export your command function
3. Add it to `src/cli.ts`
4. Write tests in a `.test.ts` file
5. Export utilities from `src/index.ts` if needed

## License

MIT
