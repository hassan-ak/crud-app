import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";

const GET_CRUDS = gql`
  query GetCruds {
    cruds {
      id
      text
    }
  }
`;
const DeleteCurdMutation = gql`
  mutation deleteCrud($id: String!) {
    deleteCrud(id: $id) {
      id
    }
  }
`;

export const DataList = () => {
  const { loading, error, data, refetch } = useQuery(GET_CRUDS);
  const [deleteCurd] = useMutation(DeleteCurdMutation);
  console.log(data);
  if (data.cruds.length === 0) {
    return (
      <div className='taskScreen taskScreenE'>
        <p>Nothing to Display</p>
      </div>
    );
  }
  const deleteCurdSubmit = async (idIn) => {
    await deleteCurd({
      variables: {
        id: idIn,
      },
    });
    await refetch();
  };
  return (
    <div>
      <div className='taskScreen'>
        {data.cruds.map((crud) => (
          <div key={crud.id}>
            <div className={crud.done ? "taskEntryA" : "taskEntry"}>
              <div
                className='archieved'
                onClick={() => {
                  deleteCurdSubmit(crud.id);
                }}
              >
                <IconButton>
                  <DeleteForeverIcon style={{ color: "red" }} />
                </IconButton>
              </div>
              <div className='contnet'>{crud.text}</div>
              <div
                className='pinned'
                onClick={() => {
                  alert("editing");
                }}
              >
                <IconButton>
                  <EditIcon style={{ color: "green" }} />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
