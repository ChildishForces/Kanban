import React from "react";
import { ThemeProvider } from "react-jss";
import logo from "./logo.svg";
import { theme } from "./utils/theme";
import Board from "./components/Board";
import Faker from "faker";
import Card, { CardProps } from "./components/Card";
import shortid from "shortid";

const fakedData: CardProps[] = [...new Array(8)].map(() => ({
  id: shortid.generate(),
  title: Faker.commerce.productName(),
  content: Faker.commerce.productDescription(),
}));

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Board cards={fakedData} />
    </ThemeProvider>
  );
}

export default App;
