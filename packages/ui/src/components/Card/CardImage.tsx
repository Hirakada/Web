import Image, { type ImageProps } from "next/image";

import { cn } from "../../lib/cn";

export interface CardImageProps extends ImageProps {}

export default function CardImage({
  className,
  alt,
  loading = "lazy",
  decoding = "async",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: CardImageProps) {
  return (
    <Image
      alt={alt}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
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