import {
  END_POSITION,
  IN_POSITION,
  MOVE_DURATION,
  PAUSE_DURATION,
  START_POSITION,
} from "./animationConfig";

function animateSpider(svgElement: SVGElement | null): void {
  if (!svgElement) return;

  // Ensure SVG can be positioned freely
  svgElement.style.position = "fixed";
  svgElement.style.left = "0";
  svgElement.style.top = "0";
  svgElement.style.transform = `translate(${START_POSITION.x}vw, ${START_POSITION.y}vh)`;

  // Step 1: Move in
  const moveIn: Animation = svgElement.animate(
    [
      { transform: `translate(${START_POSITION.x}vw, ${START_POSITION.y}vh)` },
      { transform: `translate(${IN_POSITION.x}vw, ${IN_POSITION.y}vh)` },
    ],
    {
      duration: MOVE_DURATION,
      easing: "ease-out",
      fill: "forwards",
    }
  );

  moveIn.finished.then((): void => {
    // Step 2: Pause
    setTimeout((): void => {
      // Step 3: Move out (reverse direction)
      svgElement.animate(
        [
          { transform: `translate(${IN_POSITION.x}vw, ${IN_POSITION.y}vh)` },
          { transform: `translate(${END_POSITION.x}vw, ${END_POSITION.y}vh)` },
        ],
        {
          duration: MOVE_DURATION,
          easing: "ease-in",
          fill: "forwards",
        }
      );
    }, PAUSE_DURATION);
  });
}

export default animateSpider;
