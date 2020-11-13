import * as React from "react";
import Card from "./Card";
import { CardProps, ColumnProps } from "../utils/KanbanTypes";
import { createUseStyles } from "react-jss";
import { Theme } from "../utils/theme";
import { fade } from "../utils/colorManipulation";

const useStyles = createUseStyles(
  (theme: Theme) => ({
    column: {
      zIndex: 0,
      flex: 1,
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      borderRight: {
        width: 1,
        style: "solid",
        color: fade(theme.palette.secondary, 0.25),
      },
      "&:last-child": {
        borderRight: 0,
      },
    },
    columnTitle: {
      fontWeight: 600,
      padding: theme.spacing(2),
      borderBottom: {
        width: 1,
        style: "solid",
        color: fade(theme.palette.secondary, 0.25),
      },
    },
    columnCards: {
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      flexGrow: 1,
    },
  }),
  { name: "Column" }
);

function Column({
  id,
  name,
  positions,
  cards,
  lastDragged,
  setLastDragged,
  setPositions,
}: ColumnProps): React.ReactElement {
  const classes = useStyles();
  const cardPositions = positions.filter(({ columnId }) => columnId === id);
  const columnCards = cardPositions.reduce((acc: CardProps[], cv) => {
    const matchingCard = cards.find((c) => c.id === cv.cardId);
    return matchingCard ? [...acc, matchingCard] : acc;
  }, []);
  const cardComponents = columnCards.map(
    ({ id, title, content }: CardProps) => (
      <Card
        key={id}
        id={id}
        title={title}
        content={content}
        onDrag={setLastDragged}
      />
    )
  );
  const handleDrop = (columnId: string) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    console.log(columnId, lastDragged);
    if (!lastDragged) return;
    setPositions([
      ...positions.filter((p) => p.cardId !== lastDragged),
      { cardId: lastDragged, columnId },
    ]);
  };
  const handleCancel = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={classes.column}>
      <div className={classes.columnTitle}>{name}</div>
      <div
        className={classes.columnCards}
        onDragOver={handleCancel}
        onDragEnter={handleCancel}
        onDrop={handleDrop(id)}
      >
        {cardComponents}
      </div>
    </div>
  );
}

export default Column;
