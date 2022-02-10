import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../redux/actions/modalActionCreator';
import { deleteUser } from '../../redux/actions/userActionCreator'
import CreateUserForm from '../Froms/CreateUserForm/CreateUserForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: "5px",
    p: 2,
};

const ModalComponent = () => {
    const { isOpen, data } = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeModal());

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
        dispatch(closeModal())
    }
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography sx={{ mb: 3 }} variant="h6" component="h2">
                        Do you want delete user {data.name} ?
                    </Typography >
                    <Button variant="contained"
                        color="error"
                        size="large"
                        style={{ marginLeft: 16 }}
                        onClick={() => handleDeleteUser(data.id)}
                    >Delete</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalComponent