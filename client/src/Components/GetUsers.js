import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

// need mutations and queries
function GetUsers() {
  // useQuery will be the API call
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  // on data change
  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  return (
    <div>
      {/* {users.map((val) => {
        return <h1>{val.firstName}</h1>;
      })} */}
      <h1>Get Users</h1>
    </div>
  );
}

export default GetUsers;
