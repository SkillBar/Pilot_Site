'use client';

import { Fragment, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef = null,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.6,
  ease = 'power3.out',
  scrollStart = 'top 88%',
  stagger = 0.006
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('\n').map((line, lineIndex, lines) => {
      const words = line.split(' ');
      return (
        <Fragment key={`${line}-${lineIndex}`}>
          <span className="scroll-float-line">
            {words.map((word, wordIndex) => (
              <span className="scroll-float-word" key={`${word}-${wordIndex}`}>
                {word.split('').map((char, charIndex) => (
                  <span className="char" key={`${char}-${charIndex}`}>
                    {char}
                  </span>
                ))}
                {wordIndex < words.length - 1 ? (
                  <span className="scroll-float-space" aria-hidden="true">{' '}</span>
                ) : null}
              </span>
            ))}
          </span>
          {lineIndex < lines.length - 1 ? <br /> : null}
        </Fragment>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll('.char');
    if (!charElements.length) return;

    // One-shot on enter — NOT scrubbed.
    // Scrub + Lenis was double-smoothing and felt like floating lag.
    const tween = gsap.fromTo(
      charElements,
      {
        opacity: 0,
        yPercent: 110,
        scaleY: 1.8,
        scaleX: 0.85,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        force3D: true,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          once: true,
          // No scrub — play through once when title enters.
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [
    children,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    stagger
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
