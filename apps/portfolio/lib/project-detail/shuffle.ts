/**
 * Returns a new shuffled array without
 * mutating the original array.
 */
export function shuffleArray<T>(
  array: readonly T[]
): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }

  return shuffled;
}

/**
 * Shuffle and limit the result.
 */
export function shuffleAndTake<T>(
  array: readonly T[],
  count: number
): T[] {
  return shuffleArray(array).slice(
    0,
    count
  );
}