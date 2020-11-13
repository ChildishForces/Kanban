import * as React from "react";
import withStyles, { Styles } from "react-jss";
import { Theme } from "../utils/theme";

type Props = {
  children?: React.ReactNode;
};

export const html: Styles = {
  WebkitFontSmoothing: "antialiased", // Antialiasing.
  MozOsxFontSmoothing: "grayscale", // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
};

export const body = (theme: Theme): Styles => ({
  color: theme.palette.text,
  backgroundColor: theme.palette.background,
  "@media print": {
    // Save printer ink.
    color: theme.palette.background,
    backgroundColor: theme.palette.text,
  },
});

export const styles = (theme: Theme): Styles => ({
  "@global": {
    html,
    "*, *::before, *::after": {
      boxSizing: "inherit",
    },
    "strong, b": {
      fontWeight: 600,
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      overflow: "hidden",
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: theme.palette.background,
      },
    },
  },
});

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline({ children = null }: Props): React.ReactElement {
  return <React.Fragment>{children}</React.Fragment>;
}

export default withStyles(styles)(CssBaseline);
