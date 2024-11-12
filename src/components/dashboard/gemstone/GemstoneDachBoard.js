import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DrawerListDashBoard from "../DrawerListDashBoard";
import GemstoneItemDashBoard from "./GemstoneItemDashBoard";

export default function GemstoneDachBoard() {
  const [loadingGemstone, setLoadingGemstone] = useState(true);
  const [GemstoneError, setGemstoneError] = useState(null);
  const [GemstoneResponse, setGemstoneResponse] = useState({
    gemstones: [],
    totalCount: 0,
  });

  const getGemstoneData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5125/api/v1/Gemstone/all"
      );
      setGemstoneResponse(response.data);
      console.log("API Gemstone Response:", response.data);
      setLoadingGemstone(false);
    } catch (error) {
      console.error("Error fetching Gemstone products from dachboard: ", error);
      setGemstoneError("Failed to fetch the Gemstone product from dachboard");
      setLoadingGemstone(false);
    }
  };

  // Effect for Gemstone Data
  useEffect(() => {
    getGemstoneData();
  }, []);
  console.log("Gemstone list from dachboard:", GemstoneResponse);

  //Create New Gemstone

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  // fetch category
  const [CategoriesList, setCategoriesList] = useState([]);

  function fetchCategories() {
    let CategoriesUrl = "http://localhost:5125/api/v1/Categories";
    axios
      .get(CategoriesUrl)
      .then((response) => {
        setCategoriesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("categories list", CategoriesList);

  // get information from form
  const [gemstoneInfo, setGemstoneInfo] = useState({
    gemstoneType: "",
    gemstoneColor: "",
    gemstoneImages: [],
    gemstoneName: "",
    weight: 0,
    gemstoneClarity: "",
    gemstonePrice: 0,
    gemstoneDescription: "",
    categoryId: "",
    gemstoneImageInput: "",
  });

  function onChangeHandler(event) {
    setGemstoneInfo({
      ...gemstoneInfo,
      [event.target.name]: event.target.value,
    });
  }

  const handleImageAdd = () => {
    if (gemstoneInfo.gemstoneImageInput) {
      setGemstoneInfo((prevState) => ({
        ...prevState,
        gemstoneImages: [
          ...prevState.gemstoneImages,
          prevState.gemstoneImageInput,
        ],
        gemstoneImageInput: "",
      }));
    }
  };

  console.log("gemstone Info", gemstoneInfo);

  // send request to backend
  function CreateNewGemstone() {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/Gemstone";
    axios
      .post(url, gemstoneInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Gemstone is created successfully ");
          getGemstoneData();
          closepopup();
          // Clear the form fields
          setGemstoneInfo({
            gemstoneType: "",
            gemstoneColor: "",
            gemstoneImages: [],
            gemstoneName: "",
            weight: 0,
            gemstoneClarity: "",
            gemstonePrice: 0,
            gemstoneDescription: "",
            categoryId: "",
            gemstoneImageInput: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <h1>Gemstone List</h1>
      <DrawerListDashBoard />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "70px",
            marginLeft: "auto",
          }}
        >
          <Button
            onClick={functionopenpopup}
            color="success"
            variant="contained"
          >
            Create New Jewelry
          </Button>
        </div>
        <Dialog
          // fullScreen
          open={open}
          onClose={closepopup}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Create New Gemstone
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                name="gemstoneType"
                onChange={onChangeHandler}
                variant="outlined"
                label="Type"
              ></TextField>
              <TextField
                name="gemstoneColor"
                onChange={onChangeHandler}
                variant="outlined"
                label="Color"
              ></TextField>
              <Box margin={2}>
                <h6>Image List:</h6>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {gemstoneInfo.gemstoneImages.map((imageUrl, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <img
                        src={imageUrl}
                        alt={`Gemstone ${index}`}
                        style={{ maxWidth: "100px", height: "auto" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <TextField
                name="gemstoneImageInput" // New input name for images
                onChange={onChangeHandler}
                variant="outlined"
                label="Gemstone Image URL"
                value={gemstoneInfo.gemstoneDescription || ""}
              />
              <Button
                onClick={handleImageAdd}
                color="primary"
                variant="contained"
              >
                Add Image
              </Button>
              <TextField
                name="weight"
                type="number"
                onChange={onChangeHandler}
                variant="outlined"
                label="Weight"
                inputProps={{
                  inputMode: "decimal",
                  pattern: "[0-9]*[.,]?[0-9]*",
                }}
              ></TextField>
              <TextField
                name="gemstoneNam"
                onChange={onChangeHandler}
                variant="outlined"
                label="Name Of Gemstone "
              ></TextField>
              <TextField
                name="gemstoneClarity"
                onChange={onChangeHandler}
                variant="outlined"
                label="Clarity "
              ></TextField>
              <TextField
                name="gemstonePrice"
                type="number"
                onChange={onChangeHandler}
                variant="outlined"
                label="Price"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              ></TextField>
              <TextField
                name="gemstoneDescription"
                onChange={onChangeHandler}
                variant="outlined"
                label="Description"
              ></TextField>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gemstone Id
                </InputLabel>
                <Select
                  labelId="CategoryId"
                  name="categoryId"
                  value={gemstoneInfo.categoryId}
                  label="CategoryId"
                  onChange={onChangeHandler}
                >
                  {CategoriesList.map((category) => {
                    return (
                      <MenuItem
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                onClick={CreateNewGemstone}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </div>
      <div
        style={{
          maxWidth: "1200px",
          border: "1px solid #333",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
          marginTop: "25px",
        }}
      >
        <Table size="small" style={{ border: "1px solid #ccc" }}>
          <TableHead>
            <TableRow>
              <TableCell>Gemstone ID</TableCell>
              <TableCell>Gemstone Type</TableCell>
              <TableCell>Gemstone Color</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Gemstone Images</TableCell>
              <TableCell>Gemstone Clarity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {GemstoneResponse.gemstones.map((gemstone) => {
              return (
                <GemstoneItemDashBoard
                  key={gemstone.gemstoneId}
                  gemstone={gemstone}
                  getGemstoneData={getGemstoneData}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
