import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { greet } from './greet.js';

describe('greet', () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should greet with the provided name', () => {
    greet('Alice');
    expect(consoleLogSpy).toHaveBeenCalledWith('Hello, Alice!');
  });

  it('should greet in uppercase when option is enabled', () => {
    greet('Bob', true);
    expect(consoleLogSpy).toHaveBeenCalledWith('HELLO, BOB!');
  });

  it('should greet normally when uppercase option is false', () => {
    greet('Charlie', false);
    expect(consoleLogSpy).toHaveBeenCalledWith('Hello, Charlie!');
  });
});
