import React from "react";
import { ThemeProvider } from "react-jss";
import { theme } from "./utils/theme";
import Board from "./components/Board";
import CssBaseline from "./components/CssBaseline";
import Faker from "faker";
import shortid from "shortid";
import { CardProps } from "./utils/KanbanTypes";

const fakedData: CardProps[] = [...new Array(8)].map(() => ({
  id: shortid.generate(),
  title: Faker.commerce.productName(),
  content: Faker.commerce.productDescription(),
}));

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Board cards={fakedData} />
    </ThemeProvider>
  );
}

export default App;
