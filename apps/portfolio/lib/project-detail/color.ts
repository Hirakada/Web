/**
 * Convert RGB (0-255) to HSL.
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;

      case g:
        h =
          (b - r) / d + 2;
        break;

      case b:
        h =
          (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [
    h * 360,
    s * 100,
    l * 100,
  ];
}

/**
 * Convert HSL to RGB.
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const value = Math.round(l * 255);

    return [value, value, value];
  }

  const hueToRgb = (
    p: number,
    q: number,
    t: number
  ) => {
    if (t < 0) t += 1;

    if (t > 1) t -= 1;

    if (t < 1 / 6)
      return p + (q - p) * 6 * t;

    if (t < 1 / 2)
      return q;

    if (t < 2 / 3)
      return (
        p +
        (q - p) *
          (2 / 3 - t) *
          6
      );

    return p;
  };

  const q =
    l < 0.5
      ? l * (1 + s)
      : l + s - l * s;

  const p = 2 * l - q;

  const r = hueToRgb(
    p,
    q,
    h + 1 / 3
  );

  const g = hueToRgb(
    p,
    q,
    h
  );

  const b = hueToRgb(
    p,
    q,
    h - 1 / 3
  );

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ];
}

/**
 * Brighten an RGB colour by increasing
 * its HSL lightness.
 */
export function brightenColor(
  rgb: [number, number, number],
  amount = 15
): [number, number, number] {
  let [h, s, l] = rgbToHsl(
    rgb[0],
    rgb[1],
    rgb[2]
  );

  l = Math.min(
    100,
    l + amount
  );

  return hslToRgb(
    h,
    s,
    l
  );
}

/**
 * Convert RGB tuple to CSS rgb().
 */
export function rgbToCss(
  rgb: [number, number, number]
) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/**
 * Convert RGB tuple to CSS rgba().
 */
export function rgba(
  rgb: [number, number, number],
  alpha: number
) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}