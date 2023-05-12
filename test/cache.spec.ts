import { describe, expect, it, vi } from 'vitest';

vi.mock('~/src/index');
describe('cache', async (): Promise<void> => {
  it('should sum two numbers', async (): Promise<void> => {
    expect(1 + 1).toBe(2);
  });
});
