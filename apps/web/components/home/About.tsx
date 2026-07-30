"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BulletTag } from "@hirakada/ui";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-dvh items-center overflow-hidden py-section"
    >
      {/* Background Glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="absolute left-1/2 top-1/2 -z-10 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container grid items-center gap-12 lg:grid-cols-[2fr_1.8fr]">
        {/* Image */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="image flex justify-center"
        >
          <motion.div
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
          <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-3xl">
            <Image
              src="/img/profile.webp"
              alt="Hizkya Raka Priananda"
              width={700}
              height={875}
              priority
              className="
                aspect-[4/5]
                w-full
                max-w-xl
                object-cover
                object-top
              "
            />
          </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="max-w-xl"
        >
          <span className="text-label text-brand uppercase tracking-widest">
            About
          </span>

          <h2 className="text-display mt-4 text-just">
            Designing digital experiences that bridge creativity, technology, and business.
          </h2>

          <p className="text-body text-muted mt-8 text-justify">
            I&apos;m <strong>Hizkya Raka Priananda</strong>, a Digital Business
            Innovation student passionate about creating meaningful digital
            experiences through modern web development, UI/UX design, branding,
            and strategic thinking.
          </p>

          <p className="text-body text-muted mt-6 text-justify">
            I enjoy transforming ideas into intuitive products that balance user
            experience, aesthetics, and business value while continuously
            exploring emerging technologies and design systems.
          </p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
            className="mt-10 grid grid-cols-[max-content_max-content] gap-x-5 gap-y-5 text-sm md:text-base"
          > 
            {[
              "UI / UX Design",
              "Frontend Development",
              "Brand Identity",
              "Digital Strategy",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{
                  x: 6,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <BulletTag
                  variant="default"
                  className="flex w-fit items-center gap-3 text-foreground"
                >
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  <span>{item}</span>
                </BulletTag>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
}