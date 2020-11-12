import * as React from "react";
import shortid from "shortid";
import Card, { CardProps } from "./Card";
import { createUseStyles } from "react-jss";
import { Theme } from "../utils/theme";
import { fade } from "../utils/colorManipulation";

type Props = {
  cards: CardProps[];
};

type Column = {
  id: string;
  name: string;
};

type ColumnPosition = {
  cardId: string;
  columnId: string;
};

const useStyles = createUseStyles(
  (theme: Theme) => ({
    column: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      borderRight: {
        width: 1,
        style: "solid",
        color: fade(theme.palette.background, 0.25),
      },
      "&:last-child": {
        borderRight: 0,
      },
    },
    columnTitle: {
      padding: theme.spacing(2),
      borderBottom: {
        width: 1,
        style: "solid",
        color: fade(theme.palette.background, 0.25),
      },
    },
    columnCards: {
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      flexGrow: 1,
    },
    columnContainer: {
      display: "flex",
      height: "100vh",
    },
  }),
  { name: "Card" }
);

function Board({ cards }: Props): React.ReactElement {
  const classes = useStyles({ green: "#0f0" });
  const [lastDragged, setLastDragged] = React.useState<string | null>(null);
  const [columns, setColumns] = React.useState<Column[]>([
    { id: shortid.generate(), name: "To do" },
    { id: shortid.generate(), name: "Doing" },
    { id: shortid.generate(), name: "Done" },
  ]);
  const [positions, setPositions] = React.useState<ColumnPosition[]>(
    cards.map((c) => ({
      cardId: c.id,
      columnId: columns[0].id,
    }))
  );

  const columnComponents = columns.map(({ id, name }) => {
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

    return (
      <div className={classes.column}>
        <div className={classes.columnTitle}>{name}</div>
        <div
          className={classes.columnCards}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleDrop(id)}
        >
          {cardComponents}
        </div>
      </div>
    );
  });

  return <div className={classes.columnContainer}>{columnComponents}</div>;
}

export default Board;
