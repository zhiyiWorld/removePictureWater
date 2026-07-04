const URL_PATTERN = /https?:\/\/[^\s`]+/i;

export function extractFirstHttpUrl(input: string): string {
  const matched = input.match(URL_PATTERN)?.[0] ?? '';

  return matched.trim();
}
