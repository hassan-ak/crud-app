import React from "react";
import { AppHead } from "./loggedIn/AppHead";
import "./appLogedIn.css";
import { InputForm } from "./loggedIn/InputForm";
import { DataList } from "./loggedIn/DataList";
import { gql, useQuery } from "@apollo/client";
const GET_CRUDS = gql`
  query GetCruds {
    cruds {
      id
      text
    }
  }
`;

export const AppLogedIn = () => {
  const { loading, error, data, refetch } = useQuery(GET_CRUDS);
  return (
    <div>
      <AppHead />
      <InputForm />
      {error ? (
        <div className='taskScreen taskScreenE'>
          <p>{error.message}</p>
        </div>
      ) : null}
      {loading ? (
        <div className='taskScreen taskScreenE'>
          <p>loading...</p>
        </div>
      ) : null}
      {!loading && !error && <DataList />}
    </div>
  );
};
