import { Layout } from "antd";
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Persons from "./pages/Persons";
import MovieDetail from "./components/MovieDetail";
import Login from "./pages/Login";
import UpdateMovie from "./components/UpdateMovie";
import AddMovie from "./components/AddMovie";
import AddPerson from "./components/AddPerson";
import UpdatePerson from "./components/UpdatePerson";

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
            <Route exact path="/:movieId" Component={MovieDetail} />{" "}
            {/* for Home Component */}
            <Route exact path="/movies-card" Component={Movies} />
            <Route
              exact
              path="/movies-card/:movieId"
              Component={MovieDetail}
            />{" "}
            {/* for Movies Component */}
            <Route exact path="/movies-card/create" Component={AddMovie} />
            <Route
              exact
              path="/movies-card/:movieId/edit"
              Component={UpdateMovie}
            />
            <Route exact path="/persons-list" Component={Persons} />
            <Route exact path="/persons-list/create" Component={AddPerson} />
            <Route
              exact
              path="/persons-list/:personId/edit"
              Component={UpdatePerson}
            />
          </Routes>
        </Content>
      </Layout>
    </>
  );
};

export default App;
