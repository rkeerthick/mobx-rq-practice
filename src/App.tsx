import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Routing from "./Routing/Routing";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { observer } from "mobx-react-lite";
import Layout from "./Components/Layout/Layout";
const queryClient = new QueryClient();

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routing />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
});

export default App;
