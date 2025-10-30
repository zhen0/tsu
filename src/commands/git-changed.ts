import { getChangedFiles, isGitRepo, type ChangeType } from '../utils/git.js';

export interface GitChangedOptions {
  staged?: boolean;
  unstaged?: boolean;
  all?: boolean;
  baseBranch?: string;
  verbose?: boolean;
}

export function gitChanged(options: GitChangedOptions = {}): void {
  if (!isGitRepo()) {
    console.error('Error: Not in a git repository');
    process.exit(1);
  }

  const baseBranch = options.baseBranch || 'main';
  const verbose = options.verbose || false;

  // Handle --all option
  if (options.all) {
    const committedFiles = getChangedFiles({
      type: 'committed',
      baseBranch,
    });
    const stagedFiles = getChangedFiles({ type: 'staged' });
    const unstagedFiles = getChangedFiles({ type: 'unstaged' });

    if (
      committedFiles === null ||
      stagedFiles === null ||
      unstagedFiles === null
    ) {
      console.error('Error: Failed to get changed files');
      process.exit(1);
    }

    const totalChanges =
      committedFiles.length + stagedFiles.length + unstagedFiles.length;

    if (totalChanges === 0) {
      // Exit silently for pipe-friendliness
      return;
    }

    if (verbose) {
      // Verbose output with headers (to stderr to keep stdout clean)
      if (committedFiles.length > 0) {
        console.error(
          `Committed changes (compared to ${baseBranch}) (${committedFiles.length}):`
        );
      }
      if (stagedFiles.length > 0) {
        console.error(`Staged changes (${stagedFiles.length}):`);
      }
      if (unstagedFiles.length > 0) {
        console.error(`Unstaged changes (${unstagedFiles.length}):`);
      }
    }

    // Output files to stdout with type prefix for --all
    committedFiles.forEach((file) => {
      console.log(`committed:${file}`);
    });
    stagedFiles.forEach((file) => {
      console.log(`staged:${file}`);
    });
    unstagedFiles.forEach((file) => {
      console.log(`unstaged:${file}`);
    });

    return;
  }

  // Determine which type of changes to show
  let type: ChangeType = 'committed';
  if (options.staged) {
    type = 'staged';
  } else if (options.unstaged) {
    type = 'unstaged';
  }

  const files = getChangedFiles({
    type,
    baseBranch,
  });

  if (files === null) {
    console.error('Error: Failed to get changed files');
    process.exit(1);
  }

  if (files.length === 0) {
    // Exit silently for pipe-friendliness
    return;
  }

  if (verbose) {
    // Print header to stderr
    let header = '';
    if (type === 'committed') {
      header = `Changed files compared to ${baseBranch} (${files.length}):`;
    } else if (type === 'staged') {
      header = `Staged files (${files.length}):`;
    } else if (type === 'unstaged') {
      header = `Unstaged files (${files.length}):`;
    }
    console.error(header);
  }

  // Output files to stdout, one per line
  files.forEach((file) => {
    console.log(file);
  });
}
