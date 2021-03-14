import React from "react";
import { Helmet } from "react-helmet";

export default function Error() {
  return (
    <div>
      <Helmet>
        <title>CRUD | 404</title>
      </Helmet>
      <div>Error Page</div>
    </div>
  );
}
