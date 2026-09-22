import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');

test('keeps the brand mark as a grid so its initials remain centred', () => {
  assert.match(css, /\.brand strong,\s*\.brand div span\s*{\s*display:\s*block;/);
  assert.doesNotMatch(css, /\.brand strong,\s*\.brand span\s*{\s*display:\s*block;/);
});

test('renders the battery fill as a block with measurable width', () => {
  assert.match(css, /\.battery span\s*{[^}]*display:\s*block;/s);
});
