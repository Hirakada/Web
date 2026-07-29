import Image, { type ImageProps } from "next/image";

import { cn } from "../../lib/cn";

export interface CardImageProps extends ImageProps {}

export default function CardImage({
  className,
  alt,
  ...props
}: CardImageProps) {
  return (
    <Image
      alt={alt}
      className={cn(
        "block",
        "w-full",
        "h-50",
        "object-cover",
        className,
      )}
      {...props}
    />
  );
}