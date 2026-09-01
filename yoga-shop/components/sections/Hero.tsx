"use client";

import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "20%"]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-40%"]
  );


  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#F5EFE3]
      "
    >

      {/* Background Image */}
      <motion.div
        style={{ y: imageY }}
        className="
          absolute
          inset-0
        "
      >

        <img
          src="/images/nawal-hero.jpg"
          alt="Nawal Yoga"
          className="
            h-full
            w-full
            object-cover
          "
        />


        {/* Cinematic layers */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/20
            via-transparent
            to-[#F5EFE3]
          "
        />


        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#F5EFE3]/70
            via-transparent
            to-transparent
          "
        />

      </motion.div>



      <motion.div
        style={{ y: textY }}
        className="
          relative
          flex
          min-h-[100svh]
          items-center
        "
      >

        <Container>

          <div
            className="
              max-w-3xl
            "
          >

            <motion.p
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:.2}}
              className="
                font-body
                text-xs
                tracking-[0.3em]
                uppercase
                text-soft-brown-dark
              "
            >
              نوال يوغا
              <span className="mx-3">
                /
              </span>
              رحلة الهدوء اليومية
            </motion.p>



            <motion.h1
              initial={{opacity:0,y:40}}
              animate={{opacity:1,y:0}}
              transition={{delay:.35}}
              className="
                mt-8
                font-display
                text-5xl
                leading-[1.05]
                text-charcoal
                md:text-8xl
              "
            >
              مساحة صغيرة...
              <br/>
              لسلام أكبر.
            </motion.h1>



            <motion.p
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:.55}}
              className="
                mt-8
                max-w-lg
                font-body
                text-lg
                leading-relaxed
                text-charcoal/70
              "
            >
              فرشات يوغا مصممة بعناية،
              لترافق لحظاتك اليومية من الحركة،
              التنفس، والراحة.
            </motion.p>



            <motion.div
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:.7}}
              className="
                mt-10
                flex
                flex-wrap
                gap-4
              "
            >

              <LinkButton
                href="#departments"
                size="lg"
              >
                اكتشفي المجموعة
              </LinkButton>


              <LinkButton
                href="#materials"
                variant="ghost"
                size="lg"
              >
                الخامات
              </LinkButton>

            </motion.div>



            {/* Small trust details */}
            <div
              className="
                mt-16
                flex
                gap-10
                text-sm
                text-charcoal/50
              "
            >

              <div>
                <p className="text-charcoal">
                  خامات طبيعية
                </p>
                <span>
                  مختارة بعناية
                </span>
              </div>


              <div>
                <p className="text-charcoal">
                  تصميم هادئ
                </p>
                <span>
                  للاستخدام اليومي
                </span>
              </div>

            </div>


          </div>

        </Container>

      </motion.div>


      {/* Scroll indicator */}
      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          text-xs
          tracking-widest
          text-charcoal/40
        "
      >
        SCROLL
      </div>


    </section>
  );
}