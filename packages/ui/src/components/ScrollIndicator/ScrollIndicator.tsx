"use client";

import { useEffect, useState } from "react";


export default function ScrollIndicator() {

  const [progress, setProgress] = useState(0);


  useEffect(() => {

    let ticking = false;


    const update = () => {

      const scrollTop =
        window.scrollY;


      const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


      const value =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 100
          : 0;


      setProgress(value);

      ticking = false;

    };


    const handleScroll = () => {

      if (!ticking) {

        window.requestAnimationFrame(update);

        ticking = true;

      }

    };


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );


    update();


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

    };

  }, []);



  return (

    <div

      className="
        fixed

        right-4

        top-0

        z-[9999]

        w-[2px]

        rounded-full

        bg-[var(--color-primary)]

        shadow-[var(--glow-text-subtle)]

        transition-[height]

        duration-300

        ease-out
      "

      style={{
        height: `${progress}%`,
      }}

    />

  );

}