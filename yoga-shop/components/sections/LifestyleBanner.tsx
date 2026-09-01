import { Reveal } from "@/components/ui/Reveal";

export function LifestyleBanner() {
  return (
    <section
      className="
        relative
        min-h-[85vh]
        overflow-hidden
        bg-charcoal
      "
    >

      {/* Background */}
      <img
        src="/images/yoga-lifestyle.jpg"
        alt="Nawal Yoga morning ritual"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          scale-105
        "
      />


      {/* Soft layers */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/35
          to-black/10
        "
      />


      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/40
          to-transparent
        "
      />


      {/* Content */}
      <div
        className="
          relative
          flex
          min-h-[85vh]
          items-end
          px-6
          pb-10
          md:px-16
          md:pb-20
        "
      >

        <Reveal className="max-w-2xl">

          <div
            className="
              mb-8
              flex
              items-center
              gap-4
              text-xs
              uppercase
              tracking-[0.25em]
              text-white/60
            "
          >
            <span className="h-px w-12 bg-white/40" />
            طقس نوال يوغا
          </div>


          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/10
              p-7
              backdrop-blur-md
              md:p-10
            "
          >

            <h2
              className="
                font-display
                text-4xl
                leading-tight
                text-white
                md:text-6xl
              "
            >
              وقتك إلك...
              <br />
              حتى لو كان عشرين دقيقة.
            </h2>


            <p
              className="
                mt-6
                max-w-md
                font-body
                text-base
                leading-relaxed
                text-white/75
              "
            >
              مساحة صغيرة في بيتك،
              نفس أهدأ،
              وبداية أجمل ليومك.
              خليكِ قريبة من نفسك مع نوال يوغا.
            </p>


            <div
              className="
                mt-8
                flex
                items-center
                gap-8
                text-sm
                text-white/60
              "
            >
              <div>
                <p className="text-white">
                  20 دقيقة
                </p>
                <span>
                  يوميًا
                </span>
              </div>

              <div className="h-8 w-px bg-white/20" />

              <div>
                <p className="text-white">
                  هدوء
                </p>
                <span>
                  توازن
                </span>
              </div>
            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
}