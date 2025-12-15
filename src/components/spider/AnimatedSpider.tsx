import { useRef } from "react";
import CrawlingSpider from "./CrawlingSpider";
import { useSvgFlyInAnimation } from "./useAnimation";

type AnimatedSvgProps = {
  play?: boolean;
  speed?: number; // multiplier: 1 = default
  loop?: boolean; // loop crawl after finishing
  intervalMs?: number; // total cycle time for one sequence
  stepPx?: number; // horizontal peek distance in pixels
};

export default function AnimatedSvg({
  play = true,
  speed = 1,
  loop = false,
  intervalMs = 30000,
  stepPx = 64,
}: AnimatedSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useSvgFlyInAnimation(svgRef, play, { speed, loop, intervalMs, stepPx });

  return <CrawlingSpider ref={svgRef} />;
}
