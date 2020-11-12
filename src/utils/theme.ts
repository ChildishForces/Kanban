export type Theme = {
  spacing: (value: number) => number;
  palette: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
};

const colours = ["#e71d36", "#1c1f33", "#8B85C1", "#ffffff"];

export const theme = {
  spacing: (value: number) => value * 8,
  palette: {
    primary: colours[0],
    secondary: colours[2],
    background: colours[1],
    text: colours[3],
  },
};
