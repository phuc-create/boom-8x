import React, { useState } from "react";
import "./App.css";
import { Formik, Field } from "formik";
import { Button, Checkbox, Radio, TextField } from "@material-ui/core";
interface Values {
  firstName: string;
  lastName: string;
  age: number;
  anything: string;
  tall: boolean;
  hobby: Array<any>;
}
const App: React.FC = () => {
  const [values] = useState<Values>({
    firstName: "",
    lastName: "",
    age: 0,
    anything: "",
    tall: false,
    hobby: [],
  });
  return (
    <div className="App">
      <Formik
        initialValues={values}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, handleBlur, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              placeholder="first name"
              name="firstName"
              type="input"
              as={TextField}
            />
            {/* WHEN YOU USING CODE BELOW ,IT SO CUMBERSOME SO TRY TO USING CODE ON TOP TO MAKE IT CLEAR AND EASIER TO UNDERSTAND AND THE VALUE OF IT WILL DEPEND ON NAME ATTRIBUTE */}
            {/* <TextField
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
            <div></div>
            <Field placeholder="last name" name="lastName" as={TextField} />
            <div></div>
            <Field name="hobby" value="soccer" as={Checkbox} />
            <Field name="hobby" value="music" as={Checkbox} />
            <Field name="hobby" value="playing game" as={Checkbox} />
            <div></div>
            <Field type="checkbox" name="tall" as={Radio} />
            {/* <TextField
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
            <div></div>
            <TextField
              name="age"
              label="Age"
              type="number"
              value={values.age}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div></div>
            <Field
              placeholder="anything you want"
              name="anything"
              type="input"
              as={TextField}
            />
            <div></div>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
