"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import {
  SocialButton,
  SocialButtonGroup,
} from "@hirakada/ui";


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

        flex
        w-full
        min-h-screen
        flex-col
        items-center
        justify-center

        gap-[clamp(1.5rem,4vw,2rem)]

        px-(--global-padding-x)

        text-center
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
          ease: [0.47, 0, 0.23, 1.38],
        }}
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

      </motion.div>



      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
      >

        <SocialButtonGroup
          className="
            social-list

            mt-4

            flex

            w-fit

            items-center

            justify-center

            gap-4.5

            mx-auto
          "
        >

          <SocialButton
            href="https://linkedin.com/in/hirakada"
            label="LinkedIn"
            icon={
              <Icon
                icon="mdi:linkedin"
                width="24"
                height="24"
              />
            }
          />


          <SocialButton
            href="https://instagram.com/hirakada"
            label="Instagram"
            icon={
              <Icon
                icon="mdi:instagram"
                width="24"
                height="24"
              />
            }
          />


          <SocialButton
            href="https://github.com/Hirakada"
            label="GitHub"
            icon={
              <Icon
                icon="mdi:github"
                width="24"
                height="24"
              />
            }
          />

        </SocialButtonGroup>

      </motion.div>


    </section>
  );
}