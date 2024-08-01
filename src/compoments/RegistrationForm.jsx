import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const RegistrationForm = ({ onSubmit }) => {
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    skills: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    skills: Yup.array().min(1, "At least one skill is required"),
  });

  const handleDelete = (index) => {
    const updatedUsers= users.filter((_,i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users',JSON.stringify(updatedUsers));
  };

  const handleEdit = (index) => {
    const user = users[index];
    setEditingIndex(index);
    setFormValues(user);
  };

  const handleUpdate = (values, { setSubmitting, resetForm }) => {
    const updatedUsers = users.map((user,i)=>(i === editingIndex ? values : user));
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingIndex(null);
    setFormValues(initialValues);
    resetForm();
    setSubmitting(false);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const newUsers = [...users, values];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setEditingIndex(null);
    setFormValues(initialValues);
    resetForm();
    setSubmitting(false);
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ editingIndex === null ? handleSubmit : handleUpdate}
      >
        {(formik) => {
          return (
            <Form>
              <div>
                <label htmlFor="name">Name : </label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component={StyledErrorMessage} />
              </div>
              <div>
                <label htmlFor="email">Email : </label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component={StyledErrorMessage} />
              </div>
              <div>
                <label>Gender : </label>
                <div>
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>
                  <ErrorMessage name="gender" component={StyledErrorMessage} />
                </div>
              </div>
              <div>
                <label>Skills : </label>
                <div>
                  <label>
                    <Field type="checkbox" name="skills" value="react" />
                    React
                  </label>
                  <label>
                    <Field type="checkbox" name="skills" value="js" />
                    JS
                  </label>
                  <label>
                    <Field type="checkbox" name="skills" value="css" />
                    CSS
                  </label>
                  <ErrorMessage name="skills" component={StyledErrorMessage} />
                </div>
              </div>
              <button type="submit" disabled={formik.isSubmitting}>
                {editingIndex === null ? 'Submit' : 'Update'}
              </button>
            </Form>
          );
        }}
      </Formik>
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (<tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.skills.join(",")}</td>
              <td>
                <button onClick={() => {handleEdit(index)}}>Edit</button>
                <button onClick={() => {handleDelete(index)}}>Delete</button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationForm;
