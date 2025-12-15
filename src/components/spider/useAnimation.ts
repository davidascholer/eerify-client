// useSvgFlyInAnimation.js
import { useEffect } from "react";
import { MOVE_DURATION, PAUSE_DURATION } from "./animationConfig";

type AnimationOptions = {
  speed?: number; // 1 = base speed, >1 faster, <1 slower
  loop?: boolean; // whether to repeat crawl
  intervalMs?: number; // desired total cycle length
  stepPx?: number; // horizontal peek distance
};

export function useSvgFlyInAnimation(
  ref: React.RefObject<SVGSVGElement> | null,
  trigger = true,
  options: AnimationOptions = {}
) {
  useEffect(() => {
    if (!ref || !ref.current || !trigger) return;

    const el = ref.current;

    // Determine pixel size of the SVG to stage the reveal from top-left
    const widthPx = el.width?.baseVal?.value || 100;

    // Place at the very top-left corner and start hidden horizontally off-screen
    el.style.position = "fixed";
    el.style.left = "0px";
    el.style.top = "0px";
    // Ensure transforms apply relative to the graphic's box for consistent rotation
    // and keep rotation centered so it "turns around" instead of sliding.
    (el.style as any).transformBox = "fill-box";
    el.style.transformOrigin = "50% 50%";
    el.style.transform = `translate(${-widthPx}px, 0px)`;

    const speed = options.speed ?? 1;
    const loop = options.loop ?? false;
    const intervalMs = options.intervalMs ?? 30000; // default 30s

    let timeoutId: NodeJS.Timeout | undefined;
    let activeAnimations: Animation[] = [];

    const runSequence = () => {
      // Reset to start position
      // Initial transform is set above using pixel units

      // 1) Move in
      const moveIn = el.animate(
        [
          { transform: `translate(${-widthPx}px, 0px)` },
          { transform: `translate(0px, 0px)` },
        ],
        {
          duration: MOVE_DURATION / speed,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      activeAnimations.push(moveIn);

      moveIn.finished.then(() => {
        // 2) Pause in place
        timeoutId = setTimeout(() => {
          // 3) Crawl in a small amount horizontally only (keep Y at 0)
          const defaultStep = Math.min(100, Math.max(40, Math.floor(widthPx)));
          const stepPx = options.stepPx ?? defaultStep; // allow override
          const crawlInDuration = (MOVE_DURATION * 3) / speed;
          const crawlIn = el.animate(
            [
              { transform: `translate(0px, 0px)` },
              { transform: `translate(${stepPx}px, 0px)` },
            ],
            {
              duration: crawlInDuration,
              easing: "ease-in-out",
              fill: "forwards",
            }
          );
          activeAnimations.push(crawlIn);

          crawlIn.finished.then(() => {
            // 4) Pause briefly before turning around
            timeoutId = setTimeout(() => {
              // 5) Turn around in place (horizontal flip)
              const flipDuration = (MOVE_DURATION * 1.5) / speed;
              const flip = el.animate(
                [
                  { transform: `translate(${stepPx}px, 0px) scaleX(1)` },
                  { transform: `translate(${stepPx}px, 0px) scaleX(-1)` },
                ],
                {
                  duration: flipDuration,
                  easing: "ease-in-out",
                  fill: "forwards",
                }
              );
              activeAnimations.push(flip);

              flip.finished.then(() => {
                // 6) Crawl back to off-screen left while flipped
                const crawlBackDuration = (MOVE_DURATION * 3) / speed;
                const crawlBack = el.animate(
                  [
                    { transform: `translate(${stepPx}px, 0px) scaleX(-1)` },
                    { transform: `translate(${-widthPx}px, 0px) scaleX(-1)` },
                  ],
                  {
                    duration: crawlBackDuration,
                    easing: "ease-in-out",
                    fill: "forwards",
                  }
                );
                activeAnimations.push(crawlBack);

                crawlBack.finished.then(() => {
                  if (loop) {
                    // Keep overall cycle close to target interval
                    const elapsedMs =
                      (MOVE_DURATION / speed) + // move in
                      PAUSE_DURATION + // first pause
                      crawlInDuration +
                      PAUSE_DURATION + // turnaround pause
                      flipDuration +
                      crawlBackDuration;
                    const remainingMs = Math.max(0, intervalMs - elapsedMs);
                    timeoutId = setTimeout(() => {
                      runSequence();
                    }, remainingMs);
                  }
                });
              });
            }, PAUSE_DURATION);
          });
        }, PAUSE_DURATION);
      });
    };

    // Start first cycle
    runSequence();

    return () => {
      activeAnimations.forEach((a) => a.cancel());
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ref, trigger, options.speed, options.loop, options.intervalMs]);
}
