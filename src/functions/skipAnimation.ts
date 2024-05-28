import {
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

function skipAnimation(
  style: DraggableProvidedDraggableProps["style"],
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    transitionDuration: `1ms`,
  };
}

export default skipAnimation;
