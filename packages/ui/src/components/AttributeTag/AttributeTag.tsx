import Image from "next/image";
import type { ReactNode } from "react";


export interface AttributeTagProps {
  children: ReactNode;
  iconUrl?: string | undefined;
  className?: string | undefined;
}


export default function AttributeTag({
  children,
  iconUrl,
  className = "",
}: AttributeTagProps) {

  return (
    <div
      className={[
        "tag-item",

        // display
        "flex",

        // sizing
        "w-fit",

        // alignment
        "items-center",
        "justify-center",

        // spacing
        "gap-(--space-2)",

        // padding
        "px-(--button-padding-x)",
        "py-(--space-3)",

        // shape
        "rounded-(--radius-button)",

        // border
        "border",
        "border-(--color-border-subtle)",

        // colors
        "bg-(--color-surface)",
        "text-(--color-on-surface)",

        // typography (old body 14px)
        "text-sm",
        "font-medium",

        // transition
        "transition-all",
        "duration-300",

        // hover
        "hover:scale-105",
        "hover:bg-(--color-primary-subtle)",
        "hover:border-(--color-border-strong)",

        className,

      ].join(" ")}
    >

      {iconUrl && (
        <Image
          src={iconUrl}
          alt={`${children} icon`}
          width={24}
          height={24}
          quality={70}
          sizes="24px"
          className="
            tag-icon

            max-h-6
            max-w-6

            shrink-0

            object-contain
          "
        />
      )}


      <span
        className="
          tag-name
        "
      >
        {children}
      </span>

    </div>
  );
}