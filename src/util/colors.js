import styles from 'static/colors.scss';

const primary = {
  50: styles.primary50,
  100: styles.primary100,
  300: styles.primary300,
  500: styles.primary500,
  700: styles.primary700,
  900: styles.primary900,
};

const secondary = {
  100: "#A64343",
  300: "#822424",
  500: "#5C0C0C",
  700: "#390000",
  900: "#1C0000",
};

const textDark = {
  primary: styles.textDarkPrimary,
  secondary: styles.textDarkSecondary,
  tertiary: styles.textDarkTertiary,
};

const dividerColor = styles.divider;
const darkWhite = "rgb(246, 248, 249)";
const darkGray = "rgb(74, 81, 85)";
const gray = "rgb(109, 117, 121)";
const text = {
  darkGray: "rgb(74, 81, 85)",
  gray: "rgb(109, 117, 121)",
  primary: {
    light: "white",
    dark: "rgba(0, 0, 0, 0.87)",
  },
  secondary: {
    dark: "rgba(0, 0, 0, 0.54)",
  },
  tertiary: {
    dark: "rgba(0, 0, 0, 0.38)",
  },
  quartinary: {
    dark: "rgba(0, 0, 0, 0.12)",
  }
};

export {
  primary,
  secondary,
  textDark,
  dividerColor,
  darkWhite,
  darkGray,
  gray,
  text
};
