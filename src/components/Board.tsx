import * as React from "react";
import shortid from "shortid";
import { createUseStyles } from "react-jss";
import { Theme } from "../utils/theme";
import { fade } from "../utils/colorManipulation";
import { BoardProps, ColumnPosition, ColumnType } from "../utils/KanbanTypes";
import Column from "./Column";
import { AnimateSharedLayout } from "framer-motion";

const useStyles = createUseStyles(
  (theme: Theme) => ({
    columnContainer: {
      display: "flex",
      height: "100vh",
    },
  }),
  { name: "Card" }
);

function Board({ cards }: BoardProps): React.ReactElement {
  const classes = useStyles({ green: "#0f0" });
  const [lastDragged, setLastDragged] = React.useState<string | null>(null);
  const [columns, setColumns] = React.useState<ColumnType[]>([
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

  const columnComponents = columns.map((c) => (
    <Column
      key={c.id}
      id={c.id}
      name={c.name}
      cards={cards}
      lastDragged={lastDragged}
      setLastDragged={setLastDragged}
      positions={positions}
      setPositions={setPositions}
    />
  ));

  return (
    <AnimateSharedLayout>
      <div className={classes.columnContainer}>{columnComponents}</div>
    </AnimateSharedLayout>
  );
}

export default Board;
