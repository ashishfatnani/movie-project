import React, { useEffect, useState } from "react";
import { get } from "../services";
import { Table } from "antd";
import moment from "moment";
import "./MovieList.css";
const api_key = process.env.REACT_APP_API_KEY;
const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [movieLoading, setMovieLoading] = useState(false);
  useEffect(() => {
    fetchMovies({
      api_key,
    });
  }, []);
  const fetchMovies = async (queryData) => {
    setMovieLoading(true);
    const { data } = await get({
      subUrl: `/discover/movie`,
      params: queryData,
    });
    setMovieLoading(false);
    setMoviesList(data?.results);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "original_title",
      key: "original_title",
    },
    {
      title: "Released Date",
      dataIndex: "release_date",
      key: "release_date",
      render: (release_date) => moment(release_date).locale("en").format("ll"),
    },
    {
      title: "Avg Rating",
      dataIndex: "vote_average",
      key: "vote_average",
    },
  ];
  return (
    <div className="movieList">
      <Table
        bordered={true}
        loading={movieLoading}
        dataSource={moviesList}
        columns={columns}
        pagination={false}
      ></Table>
    </div>
  );
};

export default MoviesList;
