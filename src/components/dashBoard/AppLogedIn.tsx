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

// Type Defination
interface EntryProps {
  entry: string;
}

// Initial Values
const initialValues: EntryProps = {
  entry: "",
};

const crudsReducer = (state, action) => {
  switch (action.type) {
    case "addCruds":
      return [
        {
          id: Math.floor(Math.random() * 100000000000000),
          value: action.payload,
        },
        ...state,
      ];
  }
};

export const AppLogedIn = () => {
  const [cruds, dispatch] = useReducer(crudsReducer, []);
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
          onSubmit={(values, onSubmitProps) => {
            dispatch({ type: "addCruds", payload: values.entry });
            onSubmitProps.resetForm();
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
        {cruds.length === 0 ? (
          <div className='taskScreen taskScreenE'>
            <p>Nothing to Display</p>
          </div>
        ) : (
          <div className='taskScreen'>
            {cruds.map((crud, i) => (
              <div key={i}>
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
                  <div className='contnet'>{crud.value}</div>
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
