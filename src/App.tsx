import { ChakraProvider, theme, Text } from "@chakra-ui/react";
import Tracker from "./Tracker";
import { Provider } from "react-redux";
import { store } from "./store";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Text fontSize="2xl" padding="5" fontWeight="bold" fontStyle="italic">
        To-Do-Tracker
      </Text>
      <Tracker />
    </Provider>
  </ChakraProvider>
);
