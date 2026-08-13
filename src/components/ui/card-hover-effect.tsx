"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HoverEffectItem = {
  title: string;
  description: string;
  link?: string;
  icon?: ReactNode;
  wide?: boolean;
};

export function HoverEffect({
  items,
  className,
}: {
  items: HoverEffectItem[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className={cn(
            "group relative block h-full w-full p-1",
            item.wide && "md:col-span-2 lg:col-span-3",
          )}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx ? (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-[22px] bg-[#ef5a16]/20"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.1 },
                }}
              />
            ) : null}
          </AnimatePresence>
          <Card wide={item.wide}>
            {item.icon ? (
              <div className="dept-card-icon">{item.icon}</div>
            ) : null}
            <div className="dept-card-copy">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export function Card({
  className,
  children,
  wide,
}: {
  className?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "dept-card relative z-20 h-full overflow-hidden rounded-[20px]",
        wide && "dept-card--wide",
        className,
      )}
    >
      <div className="dept-card-inner relative z-50">{children}</div>
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h4 className={cn("dept-card-title", className)}>{children}</h4>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("dept-card-desc", className)}>{children}</p>
  );
}
