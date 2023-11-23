import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Routing from "./Routing/Routing";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { observer } from "mobx-react-lite";
const queryClient = new QueryClient();
const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
});

export default App;
