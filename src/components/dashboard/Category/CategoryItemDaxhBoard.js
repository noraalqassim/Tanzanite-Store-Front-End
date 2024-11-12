import React, { useState } from "react";
import axios from "axios";

import {
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";

export default function CategoryItemDaxhBoard(prop) {
  const { category, getCategoryData } = prop;

  // State for confirmation dialog
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const closeConfirmDialog = () => setOpenConfirmDelete(false);

  //delete category

  const handleDeleteClick = () => {
    setOpenConfirmDelete(true);
  };

  function deleteCategory() {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:5125/api/v1/Categories/${category.categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert(`A ${category.categoryName} Category is deleted`);
          getCategoryData();
          closeConfirmDialog();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <TableRow key={category.categoryId}>
      <TableCell>{category.categoryId}</TableCell>
      <TableCell>{category.categoryName}</TableCell>
      <TableCell>
        <img
          src={category.categoryImage}
          alt={category.categoryName}
          style={{ maxWidth: "50px", margin: "5px" }}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleDeleteClick} variant="contained" color="error">
          Delete
        </Button>
        {/* Confirmation Delete Dialog */}
        <Dialog open={openConfirmDelete} onClose={closeConfirmDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <p>
              Are you sure you want to delete this Category? <br />
              Name: {category.categoryName} <br /> (ID:{category.categoryId})
              <br /> This action cannot be undone.
            </p>
            <Stack spacing={2} direction="row">
              <Button onClick={deleteCategory} color="error" variant="outlined">
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
      </TableCell>
    </TableRow>
  );
}
