import { Layout } from "antd";
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Persons from "./pages/Persons";
import MovieDetail from "./components/MovieDetail";
import Login from "./pages/Login";
import MovieForm from "./components/MovieForm";

const { Content } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>
      <Layout>
        <Content style={{ padding: "0px 16px" }}>
          <Routes>
            <Route exact path="/login" Component={Login} />
            <Route exact path="/" Component={Home} />
            <Route exact path="/:movieId" Component={MovieDetail} />
            <Route exact path="/movies-card" Component={Movies} />
            <Route exact path="/movies-card/create" Component={MovieForm} />
            <Route exact path="/movies-card/:movieId" Component={MovieDetail} />
            <Route
              exact
              path="/movies-card/:movieId/edit"
              Component={MovieForm}
            />
            <Route exact path="/persons-list" Component={Persons} />
          </Routes>
        </Content>
      </Layout>
    </>
  );
};

export default App;
