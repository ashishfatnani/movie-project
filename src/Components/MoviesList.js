import React, { useEffect, useState } from "react";
import { get } from "../services";
import { Table, Pagination, Spin } from "antd";
import moment from "moment";
import GenreSelector from "./GenreSelector";
import "./MovieList.css";
const api_key = process.env.REACT_APP_API_KEY;
const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movieLoading, setMovieLoading] = useState(false);
  const [movieFilter, setMovieFilter] = useState({
    page: 1,
    with_genres: null,
  });

  useEffect(() => {
    fetchMovies({
      api_key,
      ...movieFilter,
    });
  }, [movieFilter]);

  const fetchMovies = async (queryData) => {
    setMovieLoading(true);
    const { data } = await get({
      subUrl: `/discover/movie`,
      params: queryData,
    });
    setMovieLoading(false);
    setMoviesList(data?.results);
    setTotalMovies(data?.total_results);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "original_title",
      key: "original_title",
      width: "300px",
    },
    {
      title: "Released Date",
      dataIndex: "release_date",
      key: "release_date",
      render: (release_date) => moment(release_date).locale("en").format("ll"),
      width: "300px",
    },
    {
      title: "Avg Rating",
      dataIndex: "vote_average",
      key: "vote_average",
      width: "300px",
    },
  ];

  const handlePageChange = (newPage, pageSize) => {
    setMovieFilter({
      page: newPage,
    });
  };

  const handleChangeGenre = (value) => {
    setMovieFilter({
      ...movieFilter,
      with_genres: value,
    });
  };

  const handleClearList = () => {
    setMovieFilter({});
  };
  return (
    <>
      <Spin spinning={movieLoading}>
        <GenreSelector
          onSelect={handleChangeGenre}
          api_key={api_key}
          onReset={handleClearList}
        />
        <div className="movieList">
          <Table
            bordered={true}
            loading={movieLoading}
            dataSource={moviesList}
            columns={columns}
            pagination={false}
          ></Table>
        </div>
        <Pagination
          showSizeChanger={false}
          showQuickJumper={false}
          pageSize={20}
          current={movieFilter?.page}
          total={totalMovies}
          defaultPageSize={20}
          pageSizeOptions={["10", "20", "30"]}
          showTotal={(count) => `Total ${count || 0} items`}
          onChange={handlePageChange}
        ></Pagination>
      </Spin>
    </>
  );
};

export default MoviesList;
