import { extendTheme, themeTools, StorageManager, ColorMode } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (value) {
        await AsyncStorage.setItem('@color-mode', value);
      }
    } catch (e) {
      console.log(e);
    }
  },
};

const HAS_COLOR_COMPONENTS = ['Icon', 'Text', 'Heading'];
const HAS_BACKGROUND_COMPONENTS = ['View', 'HStack', 'VStack'];

const hasColorComponentsStyle: any = {};
HAS_COLOR_COMPONENTS.forEach(name => {
  hasColorComponentsStyle[name] = {
    baseStyle: (props: any) => {
      return {
        color: themeTools.mode("black", "white")(props),
      };
    }
  }
});

const hasBgColorComponentsStyle: any = {};
HAS_BACKGROUND_COMPONENTS.forEach(name => {
  hasBgColorComponentsStyle[name] = {
    baseStyle: (props: any) => {
      return {
        bg: themeTools.mode("white", "black")(props),
      };
    }
  }
})

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
    Slider: {
      sizes: {
        xs: {
          thumbSize: 2,
          sliderSize: 2,
        }
      }
    },
    // ...hasColorComponentsStyle,
    // ...hasBgColorComponentsStyle,
    // Button: {
    //   baseStyle: (props: any) => {
    //     return {
    //       _text: {
    //         color: themeTools.mode("white", "black")(props),
    //         bg: props.colorScheme + '.500',
    //       },
    //     };
    //   },
    // },
  },
  fonts: {
    heading: "Raleway",
    body: "Raleway",
    mono: "RobotoMono",
  },
  config: {
    initialColorMode: "dark",
  },
});

// console.log('App theme value: ', theme);

export default theme;