import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { addUser, editUser } from '../../../redux/actions/userActionCreator'

import { Box, Button, ButtonGroup, FormControl, TextField } from '@mui/material';


const formWrapper = {
  padding: 25,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  minHeight: 200,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  borderRadius: "5px",
  p: 2,
};

const userSchema = yup.object({
  name: yup.string().required().min(3).trim(),
  username: yup.string().trim(),
  city: yup.string(),
  email: yup.string().required().email(),
});

const CreateUserForm = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });



  const { id } = params
  const { state } = useLocation();

  const onSubmit = handleSubmit(data => {

    if (id) {
      const editedUser = {
        id: parseInt(id),
        ...data,
        address: {
          city: data.city
        }
      }
      dispatch(editUser(editedUser));
      navigate("/");
      return
    }
    const newUser = {
      ...data,
      address: {
        city: data.city
      },
      id: Math.floor((1 + Math.random()) * 0x10000)
    }
    dispatch(addUser(newUser));
    navigate("/");
  })

  return (
    <>


      <Box style={formWrapper}>
        <FormControl onSubmit={onSubmit}>
          <TextField
            error={errors.name}
            sx={{ mb: 1 }}
            defaultValue={state && state.name}
            helperText={errors.name?.message}
            label="name"
            {...register("name")}
          />

          <TextField
            error={errors.userName}
            sx={{ mb: 1 }}
            defaultValue={state && state.username}
            helperText={errors.userName?.message}
            label="user name"
            {...register("username")}
          />

          <TextField
            error={errors.city}
            sx={{ mb: 1 }}
            defaultValue={state && state.city}
            helperText={errors.city?.message}
            label="city"
            {...register("city")}
          />

          <TextField
            error={errors.email}
            sx={{ mb: 1 }}
            defaultValue={state && state.email}
            helperText={errors.email?.message}
            label="email"
            type="email"
            {...register("email")}
          />

          <ButtonGroup fullWidth={true} variant="contained" aria-label="outlined button group">
            <Button color="error" onClick={() => navigate("/")}>Back</Button>
            <Button onClick={handleSubmit(onSubmit)}>{id ? "Edit user" : "Add user"}</Button>
          </ButtonGroup>

        </FormControl>
      </Box>
    </>
  )
}



export default CreateUserForm