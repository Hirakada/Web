"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Icon } from "@iconify/react";
import { socialLinks } from "@hirakada/config";

import { HEADER_HEIGHT } from "@hirakada/ui";

import {
  SocialButton,
  SocialButtonGroup,
} from "@hirakada/ui";

import LaserFlow from "@/components/effects/LaserFlow";

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);


  useEffect(() => {
    if (!roleRef.current) return;


    const typed = new Typed(roleRef.current, {
      strings: [
        "UI/UX Designer",
        "Web Developer",
        "Graphic Designer",
      ],

      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1000,

      loop: true,
      showCursor: false,
    });


    return () => {
      typed.destroy();
    };

  }, []);



  return (
    <section
      className="
        hero-section
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        px-(--global-padding-x)
        text-center
      "
      style={{
        height: `calc(100dvh - ${HEADER_HEIGHT})`,
      }}
    >
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-10
        -z-10
        h-45
        md:h-60
        lg:h-80
        overflow-hidden
      "
    >
      <LaserFlow
        color="#585858"
        wispDensity={1}
        flowSpeed={0.45}
        verticalSizing={5}
        horizontalSizing={0.7}
        fogIntensity={0.5}
        fogScale={0.44}
        wispSpeed={19}
        wispIntensity={13.7}
        flowStrength={0.46}
        decay={3}
        horizontalBeamOffset={0}
        verticalBeamOffset={-0.5}
      />
    </div>

      <div
        className="
          transition-all
          duration-700
          ease-[cubic-bezier(0.47,0,0.23,1.38)]
        "
      >

        <h2
          className="
            greeting
          "
        >
          Hi! I am
        </h2>


        <h1
          className="
            role
            min-h-[clamp(1.75rem,4.5vw,2.5rem)]
            text-center
          "
        >

          <span
            ref={roleRef}

            className="
              auto-type

              inline-block

              min-w-[clamp(min-content,60vw,max-content)]

              max-w-full

              whitespace-normal

              wrap-break-word

              opacity-0

              animate-fade-in-typed
            "
          />

        </h1>

      </div>

      <div
        className="
          mt-4
          transition-all
          duration-700
          delay-300
          ease-[cubic-bezier(0.47,0,0.23,1.38)]
        "
      >

      <SocialButtonGroup
        className="
          social-list
          mx-auto
          flex
          w-fit
          items-center
          justify-center
          gap-4.5
        "
      >
        {socialLinks.map((social) => (
          <SocialButton
            key={social.label}
            href={social.href}
            label={social.label}
            icon={
              <Icon
                icon={social.icon}
                width="24"
                height="24"
              />
            }
          />
        ))}
      </SocialButtonGroup>

      </div>


    </section>
  );
}