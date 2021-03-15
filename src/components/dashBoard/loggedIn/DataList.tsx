import React, { useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

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
const UpdateCrudMutation = gql`
  mutation updateCrud($id: String!, $text: String!) {
    updateCrud(id: $id, text: $text) {
      id
    }
  }
`;

// Type Defination
interface EntryProps {
  entry: string;
}

export const DataList = () => {
  const { loading, error, data, refetch } = useQuery(GET_CRUDS);
  const [deleteCurd] = useMutation(DeleteCurdMutation);
  const [updateCrud] = useMutation(UpdateCrudMutation);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedId, setEditedId] = useState("");
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
  const updateCrudSubmit = async (id: any, textE: string) => {
    await updateCrud({
      variables: {
        id: id,
        text: textE,
      },
    });
    await refetch();
  };
  const initialValues: EntryProps = {
    entry: editedText,
  };
  return (
    <div>
      <div className='taskScreen'>
        {editing && (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                entry: Yup.string()
                  .min(3, "Must be 3 characters or more")
                  .max(15, "Must be 15 characters or less")
                  .required("Kindly add some Text"),
              })}
              onSubmit={(values) => {
                updateCrudSubmit(editedId, values.entry);
                setEditing(false);
              }}
            >
              <Form className='formControl1'>
                <div className='fieldsDiv1'>
                  <Field
                    as={TextField}
                    variant='outlined'
                    className='fields'
                    name='entry'
                    label='Your Entry here'
                    helperText={
                      <ErrorMessage name='entry'>
                        {(msg) => <span className='error'>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </div>
                <div className='btnDivF'>
                  <Button
                    style={{ color: "white" }}
                    variant='contained'
                    className='green'
                    type='submit'
                  >
                    <EditIcon />
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        )}
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
                  setEditedText(crud.text);
                  setEditedId(crud.id);
                  setEditing(true);
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
