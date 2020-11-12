import * as React from "react";
import { createUseStyles } from "react-jss";
import { Theme } from "../utils/theme";
import { fade } from "../utils/colorManipulation";
import { useMotionValue, motion, animate } from "framer-motion";

export type CardProps = {
  id: string;
  title: string;
  content: string;
  onDrag?: (id: string) => void;
};

const useStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      background: theme.palette.secondary,
      text: theme.palette.text,
      marginBottom: theme.spacing(1),
      position: "relative",
      zIndex: ({ isDragging }: { isDragging: boolean }) =>
        isDragging ? 10 : 0,
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

function Card({ id, title, content, onDrag }: CardProps) {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const classes = useStyles({ isDragging });
  // const startPosition = React.useRef<{ x: number; y: number } | undefined>();
  // const x = useMotionValue<number>(0);
  // const y = useMotionValue<number>(0);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // const { clientX, clientY } = event;
    // startPosition.current = { x: clientX, y: clientY };
    setIsDragging(true);
    if (onDrag) onDrag(id);
  };
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    // console.log(event);
    // const { clientX, clientY } = event;
    // if (!startPosition.current || !clientX || !clientY) return;
    // x.set(x.get() + (event.clientX - (startPosition?.current?.x ?? 0)));
    // y.set(y.get() + (event.clientY - (startPosition?.current?.y ?? 0)));
    // startPosition.current = { x: clientX, y: clientY };
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // startPosition.current = undefined;
    setIsDragging(false);
  };

  return (
    <motion.div className={classes.root}>
      <div
        draggable
        // onDragEnter={(e) => e.preventDefault()}
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
