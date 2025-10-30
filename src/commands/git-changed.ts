import { getChangedFiles, isGitRepo, type ChangeType } from '../utils/git.js';

export interface GitChangedOptions {
  staged?: boolean;
  unstaged?: boolean;
  baseBranch?: string;
}

export function gitChanged(options: GitChangedOptions = {}): void {
  if (!isGitRepo()) {
    console.error('Error: Not in a git repository');
    process.exit(1);
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
    baseBranch: options.baseBranch || 'main',
  });

  if (files === null) {
    console.error('Error: Failed to get changed files');
    process.exit(1);
  }

  if (files.length === 0) {
    let message = 'No changes found';
    if (type === 'committed') {
      message = `No committed changes compared to ${options.baseBranch || 'main'}`;
    } else if (type === 'staged') {
      message = 'No staged changes';
    } else if (type === 'unstaged') {
      message = 'No unstaged changes';
    }
    console.log(message);
    return;
  }

  // Print header
  let header = '';
  if (type === 'committed') {
    header = `Changed files compared to ${options.baseBranch || 'main'} (${files.length}):`;
  } else if (type === 'staged') {
    header = `Staged files (${files.length}):`;
  } else if (type === 'unstaged') {
    header = `Unstaged files (${files.length}):`;
  }
  console.log(header);

  // Print files
  files.forEach((file) => {
    console.log(`  ${file}`);
  });
}
