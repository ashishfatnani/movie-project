import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MoviesList from "../Components/MoviesList";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="movieStyles">
      {/************/}
      {/* <Header /> */}
      {/************/}
      <MoviesList />
      {/************/}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
