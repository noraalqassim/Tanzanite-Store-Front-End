import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TableRow,
  TableCell,
} from "@mui/material";

export default function UserItemDashBoard(prop) {
  const { user, getUsersList } = prop;

  // State for confirmation dialog
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const closeConfirmDialog = () => setOpenConfirmDelete(false);

  // Function to handle delete action
  const handleDeleteClick = () => {
    setOpenConfirmDelete(true);
  };

  function deleteUser() {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://tanzanite-store-back-end.onrender.com/api/v1/User/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert(`A ${user.name} user is deleted`);
          getUsersList();
          closeConfirmDialog();
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Button onClick={handleDeleteClick} color="error" variant="contained">
          Delete
        </Button>
      </TableCell>

      {/* Confirmation Delete Dialog */}
      <Dialog open={openConfirmDelete} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete this User? <br />
            Name: {user.name} <br /> (ID:{user.userId})
            <br /> This action cannot be undone.
          </p>
          <Stack spacing={2} direction="row">
            <Button onClick={deleteUser} color="error" variant="outlined">
              Yes, Delete
            </Button>
            <Button
              onClick={closeConfirmDialog}
              color="success"
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
