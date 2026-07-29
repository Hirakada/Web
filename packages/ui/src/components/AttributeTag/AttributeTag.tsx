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

        // spacing (old CSS)
        "gap-[0.6rem]",

        // padding (old CSS)
        "px-[1.2rem]",
        "py-[0.8rem]",

        // shape
        "rounded-lg",

        // border (old CSS)
        "border",
        "border-[rgba(var(--color-secondary-rgb),0.1)]",

        // colors
        "bg-(--color-surface)",
        "text-(--color-on-surface)",

        // typography (old body 14px)
        "text-sm",
        "font-medium",

        // transition
        "transition-all",
        "duration-300",

        // hover (old CSS)
        "hover:scale-105",
        "hover:bg-[rgba(var(--color-primary-rgb),0.1)]",
        "hover:border-[rgba(var(--color-secondary-rgb),0.3)]",

        className,

      ].join(" ")}
    >

      {iconUrl && (
        <Image
          src={iconUrl}
          alt={`${children} icon`}

          width={24}
          height={24}

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