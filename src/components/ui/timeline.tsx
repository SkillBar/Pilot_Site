"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

type TimelineProps = {
  data: TimelineEntry[];
  className?: string;
};

export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={className ?? "relative w-full font-sans"}
    >
      <div ref={ref} className="relative mx-auto max-w-6xl pb-16 md:pb-20">
        {data.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex justify-start pt-10 md:gap-10 md:pt-28"
          >
            <div className="sticky top-32 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#eff0f2] md:left-3">
                <div className="h-3 w-3 rounded-full border border-[#ef5a16]/50 bg-[#ef5a16] p-1.5 shadow-[0_0_12px_rgba(239,90,22,0.45)]" />
              </div>
              <h3 className="hidden text-xl font-bold text-[#111318]/35 md:block md:pl-20 md:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-[#111318]/40 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,rgba(17,19,24,0.12)_10%,rgba(17,19,24,0.12)_90%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.12)_10%,rgba(255,255,255,0.12)_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[#ef5a16] via-[#ff9a4a] to-transparent from-[0%] via-[12%]"
          />
        </div>
      </div>
    </div>
  );
}
