import { getColor } from "colorthief";

import {
  brightenColor,
  rgbToCss,
} from "./color";

export async function getDominantColor(
  imageUrl: string
): Promise<string | null> {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(null);
      return;
    }

    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = async () => {
      try {
        const color = await getColor(image);

        if (!color) {
          resolve(null);
          return;
        }

        const dominant = color.array();

        const brightened =
          brightenColor(dominant);

        resolve(
          rgbToCss(brightened)
        );
      } catch (error) {
        console.error(
          "Failed to extract dominant color.",
          error
        );

        resolve(null);
      }
    };

    image.onerror = () => {
      resolve(null);
    };
  });
}