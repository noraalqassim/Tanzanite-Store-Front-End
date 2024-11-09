import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function JewelryItmeDashBoard(prop) {
  const { jewelryItem, getJewelryData } = prop;

  //Delete DELETE -> http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}
  //Update Put -> http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}

  //pop up form
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  // State for confirmation dialog
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const closeConfirmDialog = () => setOpenConfirmDelete(false);

  // Function to handle delete action
  const handleDeleteClick = () => {
    setOpenConfirmDelete(true); // Open confirmation dialog
  };

  function deleteJewelryById() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert(
            `Jewelry: "${jewelryItem.jewelryName}" (with ID: ${jewelryItem.jewelryId}) is deleted successfully 👍`
          );
          getJewelryData();
          closeConfirmDialog();
        }
      })
      .catch((error) => console.log(error));
  }

  // fetch Gemstone
  const [gemstoneList, setGemstoneList] = useState({
    gemstones: [],
    totalCount: 0,
  });

  function fetchGemstone() {
    let gemstoneUrl = "http://localhost:5125/api/v1/Gemstone/all";
    axios
      .get(gemstoneUrl)
      .then((response) => {
        setGemstoneList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchGemstone();
  }, []);

  console.log("gemston list", gemstoneList);

  // Original jewelry info
  const [originalJewelryInfo, setOriginalJewelryInfo] = useState(jewelryItem);

  // Updated jewelry info
  const [updatedJewelryInfo, setUpdatedJewelryInfo] = useState({
    jewelryName: jewelryItem.jewelryName,
    jewelryType: jewelryItem.jewelryType,
    jewelryPrice: jewelryItem.jewelryPrice,
    jewelryImage: jewelryItem.jewelryImage || [],
    description: jewelryItem.description,
    gemstoneId: jewelryItem.gemstoneId,
  });

  // Update jewelry information
  const updateJewelry = () => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/Jewelry/${jewelryItem.jewelryId}`;
    axios
      .patch(url, updatedJewelryInfo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Jewelry Product updated successfully");
          getJewelryData();
          closepopup();
          setOriginalJewelryInfo(updatedJewelryInfo); // Update original info
        }
      })
      .catch((error) => console.log(error));
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedJewelryInfo({
      ...updatedJewelryInfo,
      [name]: value,
    });
  };

  // Check if the field has changed
  const isFieldChanged = (field) => {
    return updatedJewelryInfo[field] !== originalJewelryInfo[field];
  };

  // Handle image URL changes
  const handleImageChange = (event) => {
    const { value } = event.target;
    const imageList = value.split(",").map((url) => url.trim());
    setUpdatedJewelryInfo({
      ...updatedJewelryInfo,
      jewelryImage: imageList,
    });
  };

  // Function to update the selected image
  const handleUpdateImage = (imageUrl) => {
    const updatedImageList = updatedJewelryInfo.jewelryImage.map((url) =>
      url === imageUrl ? "UPDATED_URL_HERE" : url
    );
    setUpdatedJewelryInfo({
      ...updatedJewelryInfo,
      jewelryImage: updatedImageList,
    });
  };

  return (
    <div>
      <TableCell component="th" scope="row">
        {jewelryItem.jewelryId}
      </TableCell>
      <TableCell align="right">{jewelryItem.jewelryName}</TableCell>
      <TableCell align="right">{jewelryItem.jewelryType}</TableCell>
      <TableCell align="right">${jewelryItem.jewelryPrice}</TableCell>
      <TableCell align="right">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {jewelryItem.jewelryImage.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Jewelry Image ${index}`}
              style={{ maxWidth: "100px", margin: "5px" }}
            />
          ))}
        </div>
      </TableCell>
      <TableCell align="right">
        <div style={{ fontSize: "15px" }}>{jewelryItem.description}</div>
      </TableCell>
      <TableCell align="right">{jewelryItem.gemstone.gemstoneName}</TableCell>
      <TableCell align="right">${jewelryItem.finalProductPrice}</TableCell>
      <TableCell align="right">
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={handleDeleteClick} color="error" variant="contained">
            Delete
          </Button>
          <Button
            onClick={functionopenpopup}
            color="secondary"
            variant="contained"
          >
            Update
          </Button>
        </div>
      </TableCell>

      {/* Confirmation Delete Dialog */}
      <Dialog open={openConfirmDelete} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete this jewelry item? <br />
            Name: {jewelryItem.jewelryName} <br /> (ID:{jewelryItem.jewelryId})
            <br /> This action cannot be undone.
          </p>
          <Stack spacing={2} direction="row">
            <Button onClick={deleteJewelryById} color="error" variant="outlined">
              Yes, Delete
            </Button>
            <Button onClick={closeConfirmDialog} color="success" variant="outlined">
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Update form */}
      <div style={{ textAlign: "center" }}>
        <Dialog
          // fullScreen
          open={open}
          onClose={closepopup}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Update Jewelry
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                name="jewelryName"
                value={updatedJewelryInfo.jewelryName}
                onChange={handleInputChange}
                variant="outlined"
                label="Jewelry Name"
              ></TextField>
              <TextField
                name="jewelryType"
                value={updatedJewelryInfo.jewelryType}
                onChange={handleInputChange}
                variant="outlined"
                label="Jewelry Type"
              />
              <TextField
                name="jewelryPrice"
                type="number"
                value={updatedJewelryInfo.jewelryPrice}
                onChange={handleInputChange}
                variant="outlined"
                label="Jewelry Price"
              />
              <div>
                <div>
                  {updatedJewelryInfo.jewelryImage.map((imageUrl, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Jewelry Image ${index}`}
                        style={{ maxWidth: "100px", margin: "5px" }}
                      />
                      <Button onClick={() => handleUpdateImage(imageUrl)}>
                        Update
                      </Button>
                    </div>
                  ))}
                </div>
                <TextField
                  name="jewelryImage"
                  value={updatedJewelryInfo.jewelryImage.join(",")}
                  onChange={handleImageChange}
                  variant="outlined"
                  label="Jewelry Images (Comma-separated URLs)"
                />
                <Button
                  onClick={() =>
                    setUpdatedJewelryInfo({
                      ...updatedJewelryInfo,
                      jewelryImage: [],
                    })
                  }
                >
                  Clear Images
                </Button>
                <Button
                  onClick={() =>
                    setUpdatedJewelryInfo({
                      ...updatedJewelryInfo,
                      jewelryImage: updatedJewelryInfo.jewelryImage,
                    })
                  }
                  disabled={!isFieldChanged("jewelryImage")}
                >
                  Save
                </Button>
              </div>
              <TextField
                name="description"
                value={updatedJewelryInfo.description}
                onChange={handleInputChange}
                variant="outlined"
                label="Description"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gemstone Id
                </InputLabel>
                <Select
                  labelId="GemstoneId"
                  name="gemstoneId"
                  value={updatedJewelryInfo.gemstoneId}
                  label="Gemstone Id"
                  onChange={handleInputChange}
                >
                  {gemstoneList.gemstones.map((gem) => (
                    <MenuItem key={gem.gemstoneId} value={gem.gemstoneId}>
                      {gem.gemstoneName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={updateJewelry}
                color="primary"
                variant="contained"
              >
                Update
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
