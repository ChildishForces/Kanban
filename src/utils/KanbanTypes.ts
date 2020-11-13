export type CardProps = {
  id: string;
  title: string;
  content: string;
  onDrag?: (id: string) => void;
};

export type BoardProps = {
  cards: CardProps[];
};

export type ColumnType = {
  id: string;
  name: string;
};

export type ColumnPosition = {
  cardId: string;
  columnId: string;
};

export type ColumnProps = {
  id: string;
  name: string;
  cards: CardProps[];
  lastDragged: string | null;
  setLastDragged: (id: string) => void;
  positions: ColumnPosition[];
  setPositions: (positions: ColumnPosition[]) => void;
};
