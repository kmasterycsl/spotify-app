import { extendTheme, themeTools } from "native-base";

const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#e0ffeb",
        100: "#b8f6cf",
        200: "#8eefb1",
        300: "#63e792",
        400: "#39e074",
        500: "#1fc65a",
        600: "#149a45",
        700: "#096e30",
        800: "#00431b",
        900: "#001804",
      },
    },
    components: {
      Icon: {
        baseStyle: (props: any) => {
          return {
            color: themeTools.mode("black", "white")(props),
          };
        },
      },
      Text: {
        baseStyle: (props: any) => {
          return {
            color: themeTools.mode("black", "white")(props),
          };
        },
      },
      Button: {
        baseStyle: (props: any) => {
          return {
            _text: {
              color: themeTools.mode("black", "white")(props),
              bg: themeTools.mode("white", "black")(props),
            },
          };
        },
      },
      Heading: {
        baseStyle: (props: any) => {
          return {
            color: themeTools.mode("black", "white")(props),
          };
        },
      },
      HStack: {
        baseStyle: (props: any) => {
          return {
            backgroundColor: themeTools.mode("white", "black")(props),
          };
        },
      },
      VStack: {
        baseStyle: (props: any) => {
          return {
            backgroundColor: themeTools.mode("white", "black")(props),
          };
        },
      },
      View: {
        baseStyle: (props: any) => {
          return {
            backgroundColor: themeTools.mode("white", "black")(props),
          };
        },
      },
    },
    fonts: {
      heading: "Roboto",
      body: "Roboto",
      mono: "RobotoMono",
    },
    config: {
      initialColorMode: "dark",
    },
  });


export default theme;