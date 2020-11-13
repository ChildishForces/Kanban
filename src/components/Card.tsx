import * as React from "react";
import { createUseStyles } from "react-jss";
import { Theme } from "../utils/theme";
import { fade } from "../utils/colorManipulation";
import { motion } from "framer-motion";
import { CardProps } from "../utils/KanbanTypes";

const useStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      background: theme.palette.secondary,
      color: theme.palette.text,
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      position: "relative",
      zIndex: 10,
    },
    titleSegment: {
      padding: theme.spacing(2),
      borderBottom: {
        width: 1,
        style: "solid",
        color: fade(theme.palette.background, 0.25),
      },
    },
    contentSegment: {
      padding: theme.spacing(2),
    },
  }),
  { name: "Card" }
);

function Card({ id, title, content, onDrag }: CardProps): React.ReactElement {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);
  const classes = useStyles({ isTransitioning });

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
    setIsDragging(true);
    if (onDrag) onDrag(id);
  };
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
    setIsDragging(false);
    setIsTransitioning(true);
  };
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <motion.div
      className={classes.root}
      // layout
      // layoutId={`card-${id}`}
      // onLayoutAnimationComplete={handleTransitionEnd}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <div className={classes.titleSegment}>{title}</div>
        <div className={classes.contentSegment}>{content}</div>
      </div>
    </motion.div>
  );
}

export default Card;
