import React, { useState, useEffect } from "react";
import axios from "axios";
import JewelryItmeDashBoard from "./JewelryItmeDashBoard";
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

export default function JewelrtDashBoard() {
  const [loadingJewelry, setLoadingJewelry] = useState(true);
  const [jewelryError, setJewelryError] = useState(null);
  const [jewelryResponse, setJewelryResponse] = useState({
    jewelry: [],
    totalCount: 0,
  });

  const getJewelryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5125/api/v1/Jewelry/all"
      );
      setJewelryResponse(response.data);
      console.log("API Jewelry Response:", response.data);
      setLoadingJewelry(false);
    } catch (error) {
      console.error("Error fetching jewelry products from dachboard: ", error);
      setJewelryError("Failed to fetch the jewelry product from dachboard");
      setLoadingJewelry(false);
    }
  };

  // Effect for Jewelry Data
  useEffect(() => {
    getJewelryData();
  }, []);
  console.log("jewelry list from dachboard:", jewelryResponse);

  //Create New jewelry

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

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

  // get information from form
  const [jewelryInfo, setJewelryInfo] = useState({
    jewelryName: "",
    jewelryType: "",
    jewelryPrice: 0,
    jewelryImage: [],
    description: "",
    gemstoneId: "",
    jewelryImageInput: "",
  });

  function onChangeHandler(event) {
    setJewelryInfo({
      ...jewelryInfo,
      [event.target.name]: event.target.value,
    });
  }

  const handleImageAdd = () => {
    if (jewelryInfo.jewelryImageInput) {
      setJewelryInfo((prevState) => ({
        ...prevState,
        jewelryImage: [...prevState.jewelryImage, prevState.jewelryImageInput],
        jewelryImageInput: "",
      }));
    }
  };

  console.log("Jewelrty Info", jewelryInfo);

  // send request to backend
  function CreateNewJewelry() {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/Jewelry";
    axios
      .post(url, jewelryInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Jewelry is created successfully ");
          // Clear the form fields
          setJewelryInfo({
            jewelryName: "",
            jewelryType: "",
            jewelryPrice: 0,
            jewelryImage: [],
            description: "",
            gemstoneId: "",
            jewelryImageInput: "",
          });
          closepopup();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <h1>Jewelrt Product</h1>
      <DrawerListDashBoard />
      {/* create new jewelry form  */}
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
            Create New Jewelry
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                name="jewelryName"
                onChange={onChangeHandler}
                variant="outlined"
                label="JewelryName"
              ></TextField>
              <TextField
                name="jewelryType"
                onChange={onChangeHandler}
                variant="outlined"
                label="JewelryType"
              ></TextField>
              <TextField
                name="jewelryPrice"
                type="number"
                onChange={onChangeHandler}
                variant="outlined"
                label="JewelryPrice"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              ></TextField>
              <Box margin={2}>
                <h6>Image List:</h6>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {jewelryInfo.jewelryImage.map((imageUrl, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <img
                        src={imageUrl}
                        alt={`Jewelry ${index}`}
                        style={{ maxWidth: "100px", height: "auto" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <TextField
                name="jewelryImageInput" // New input name for images
                onChange={onChangeHandler}
                variant="outlined"
                label="Jewelry Image URL"
                value={jewelryInfo.jewelryImageInput || ""}
              />
              <Button
                onClick={handleImageAdd}
                color="primary"
                variant="contained"
              >
                Add Image
              </Button>
              <TextField
                name="description"
                onChange={onChangeHandler}
                variant="outlined"
                label="Description"
              ></TextField>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gemstone Id
                </InputLabel>
                <Select
                  labelId="GemstoneId"
                  name="gemstoneId"
                  value={jewelryInfo.gemstoneId}
                  label="Gemstone Id"
                  onChange={onChangeHandler}
                >
                  {gemstoneList.gemstones.map((gem) => {
                    return (
                      <MenuItem key={gem.gemstoneId} value={gem.gemstoneId}>
                        {gem.gemstoneName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                onClick={CreateNewJewelry}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </div>

      {/* jewelry Table  */}
      <div
        style={{
          maxWidth: "1200px",
          border: "1px solid #333",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
          marginTop: "25px",
        }}
      >
        <TableHead sx={{ minWidth: 650 , }} aria-label="simple table">
          <TableRow>
            <TableCell sx={{ paddingRight: "20px" }}>jewelryId</TableCell>
            <TableCell align="right" sx={{ paddingRight: "10px" }} >JewelryName</TableCell>
            <TableCell align="right" sx={{ paddingRight: "10px" }}>JewelryType</TableCell>
            <TableCell align="right" sx={{ paddingRight: "40px" }}>JewelryPrice</TableCell>
            <TableCell align="right" sx={{ paddingRight: "60px" }}>Jewelry Images</TableCell>
            <TableCell align="right" sx={{ paddingRight: "40px" }}>Description</TableCell>
            <TableCell align="right" sx={{ paddingRight: "40px" }}>Gemstone Name</TableCell>
            <TableCell align="right" sx={{ paddingRight: "40px" }}>Final Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {jewelryResponse.jewelry
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((jewelryItem) => (
                  <TableRow key={jewelryItem.jewelryId}>
                    <JewelryItmeDashBoard
                      key={jewelryItem.jewelryId}
                      jewelryItem={jewelryItem}
                      getJewelryData={getJewelryData}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={jewelryResponse.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
