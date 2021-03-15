import React, { useReducer } from "react";
import { AppHead } from "./AppHead";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IconButton, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./appLogedIn.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { gql, useMutation, useQuery } from "@apollo/client";

// Type Defination
interface EntryProps {
  entry: string;
}

// Initial Values
const initialValues: EntryProps = {
  entry: "",
};

const ADD_CRUD = gql`
  mutation AddCrud($text: String!) {
    addCrud(text: $text) {
      id
    }
  }
`;
const GET_CRUDS = gql`
  query GetCruds {
    cruds {
      id
      text
    }
  }
`;

export const AppLogedIn = () => {
  const [addCrud] = useMutation(ADD_CRUD);
  const { loading, error, data, refetch } = useQuery(GET_CRUDS);
  return (
    <div>
      <AppHead />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            entry: Yup.string()
              .min(3, "Must be 3 characters or more")
              .max(15, "Must be 15 characters or less")
              .required("Kindly add some Text"),
          })}
          onSubmit={async (values, onSubmitProps) => {
            await addCrud({ variables: { text: values.entry } });
            onSubmitProps.resetForm();
            await refetch();
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
                <AddCircleOutlineIcon />
              </Button>
            </div>
          </Form>
        </Formik>
        {error ? <div>{error.message}</div> : null}
        {loading ? <div>loading...</div> : null}
        {!loading && !error && (
          <div className='taskScreen'>
            {data.cruds.map((crud) => (
              <div key={crud.id}>
                <div className={crud.done ? "taskEntryA" : "taskEntry"}>
                  <div
                    className='archieved'
                    onClick={() => {
                      alert("Delete");
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
        )}
      </div>
    </div>
  );
};
