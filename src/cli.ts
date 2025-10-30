#!/usr/bin/env node
import { Command } from 'commander';
import { greet } from './commands/greet.js';
import { gitCheck } from './commands/git-check.js';
import { gitChanged } from './commands/git-changed.js';

const program = new Command();

program
  .name('tsutils')
  .description('TypeScript command line utilities')
  .version('0.1.0');

program
  .command('greet')
  .description('Greet a user')
  .argument('[name]', 'name to greet', 'World')
  .option('-u, --uppercase', 'convert greeting to uppercase')
  .action((name: string, options: { uppercase?: boolean }) => {
    greet(name, options.uppercase);
  });

program
  .command('git-check')
  .description('Check if current directory is in a git repository')
  .argument('[path]', 'path to check (defaults to current directory)')
  .action((path?: string) => {
    gitCheck(path);
  });

program
  .command('git-changed')
  .description('Show files that have changed compared to main branch')
  .option('-s, --staged', 'show staged changes only')
  .option('-u, --unstaged', 'show unstaged changes only')
  .option('-b, --base-branch <branch>', 'base branch to compare against', 'main')
  .action((options: { staged?: boolean; unstaged?: boolean; baseBranch?: string }) => {
    gitChanged(options);
  });

program.parse();
