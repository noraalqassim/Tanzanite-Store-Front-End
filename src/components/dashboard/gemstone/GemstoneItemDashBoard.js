import React, { useState} from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TableCell,
  TableRow
} from "@mui/material";


export default function GemstoneItemDashBoard(prop) {
  const { gemstone, getGemstoneData } = prop;
  // State for confirmation dialog
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const closeConfirmDialog = () => setOpenConfirmDelete(false);

  //delete category

  const handleDeleteClick = () => {
    setOpenConfirmDelete(true);
  };

  function deleteGemstone() {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:5125/api/v1/Gemstone/${gemstone.gemstoneId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert(`A ${gemstone.gemstoneName} Gemstone is deleted`);
          getGemstoneData();
          closeConfirmDialog();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <TableRow key={gemstone.gemstoneId}>
      <TableCell>{gemstone.gemstoneId}</TableCell>
      <TableCell>{gemstone.gemstoneType}</TableCell>
      <TableCell>{gemstone.gemstoneColor}</TableCell>
      <TableCell>{gemstone.gemstoneName}</TableCell>
      <TableCell>        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {gemstone.gemstoneImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Jewelry Image ${index}`}
              style={{ maxWidth: "50px", margin: "5px" }}
            />
          ))}
        </div></TableCell>
      <TableCell>{gemstone.gemstoneClarity}</TableCell>
      <TableCell>{gemstone.gemstonePrice}</TableCell>
      <TableCell>{gemstone.gemstoneDescription}</TableCell>
      <TableCell>{gemstone.category.categoryName}</TableCell>
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
              Name: {gemstone.gemstoneName} <br /> (ID:{gemstone.gemstoneId})
              <br /> This action cannot be undone.
            </p>
            <Stack spacing={2} direction="row">
              <Button onClick={deleteGemstone} color="error" variant="outlined">
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
