import { isGitRepo, getGitRoot } from '../utils/git.js';

export function gitCheck(path?: string): void {
  const targetPath = path || process.cwd();
  const isRepo = isGitRepo(targetPath);

  if (isRepo) {
    const root = getGitRoot(targetPath);
    console.log(`✓ This is a git repository`);
    console.log(`  Root: ${root}`);
  } else {
    console.log(`✗ Not a git repository`);
    process.exit(1);
  }
}
