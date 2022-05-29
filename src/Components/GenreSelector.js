import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { get } from "../services";
const GenreSelector = (props) => {
  const { api_key, onSelect, onReset } = props;
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    const { data } = await get({
      subUrl: `/genre/movie/list`,
      params: {
        api_key,
      },
    });
    const newArrayOfObj = data?.genres?.map(
      ({ id: value, name: label, ...rest }) => ({
        value,
        label,
      })
    );
    setGenresList(newArrayOfObj);
  };

  return (
    <div>
      <Select
        style={{
          margin: "10px",
          display: "inline-block",
          width: "25%",
        }}
        onSelect={onSelect}
        placeholder="Select Genre"
        options={genresList}
      />
      <Button onClick={onReset} type="ghost">
        Reset
      </Button>
    </div>
  );
};

export default GenreSelector;
