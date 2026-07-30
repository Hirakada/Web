"use client";

import { motion } from "framer-motion";

const transition = (duration: number) => ({
  duration,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
});

export function GlobalBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-360
          w-360
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-brand/8
          blur-[320px]
        "
      />

      {/* Blob 1 */}
      <motion.div
        animate={{
          x: [0, 120, -60, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.2, 0.95, 1],
          rotate: [0, 20, -10, 0],
          borderRadius: [
            "45% 55% 60% 40%",
            "60% 40% 45% 55%",
            "35% 65% 55% 45%",
            "45% 55% 60% 40%",
          ],
          opacity: [0.45, 0.7, 0.55, 0.45],
        }}
        transition={transition(28)}
        className="
          absolute
          -left-52
          -top-36
          h-168
          w-2xl
          bg-brand/20
          blur-[140px]
        "
      />

      {/* Blob 2 */}
      <motion.div
        animate={{
          x: [0, -140, 70, 0],
          y: [0, 70, -40, 0],
          scale: [1.15, 0.9, 1.1, 1.15],
          rotate: [0, -30, 15, 0],
          borderRadius: [
            "55% 45% 40% 60%",
            "40% 60% 55% 45%",
            "65% 35% 50% 50%",
            "55% 45% 40% 60%",
          ],
          opacity: [0.35, 0.6, 0.45, 0.35],
        }}
        transition={transition(34)}
        className="
          absolute
          -right-44
          top-10
          h-144
          w-xl
          bg-brand/15
          blur-[170px]
        "
      />

      {/* Blob 3 */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, 100, -60, 0],
          scale: [0.95, 1.15, 1, 0.95],
          rotate: [0, 25, -15, 0],
          borderRadius: [
            "50% 50% 35% 65%",
            "35% 65% 55% 45%",
            "60% 40% 50% 50%",
            "50% 50% 35% 65%",
          ],
          opacity: [0.4, 0.65, 0.5, 0.4],
        }}
        transition={transition(40)}
        className="
          absolute
          left-1/2
          top-1/2
          h-128
          w-lg
          -translate-x-1/2
          -translate-y-1/2
          bg-brand/18
          blur-[150px]
        "
      />

      {/* Blob 4 */}
      <motion.div
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 90, -40, 0],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, -20, 10, 0],
          borderRadius: [
            "65% 35% 50% 50%",
            "45% 55% 60% 40%",
            "55% 45% 35% 65%",
            "65% 35% 50% 50%",
          ],
          opacity: [0.3, 0.55, 0.4, 0.3],
        }}
        transition={transition(45)}
        className="
          absolute
          -right-28
          -bottom-28
          h-160
          w-160
          bg-brand/16
          blur-[180px]
        "
      />

      {/* Noise */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
          bg-size-[24px_24px]
        "
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,.45)_100%)]
        "
      />
    </div>
  );
}

export default GlobalBackground;