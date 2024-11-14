import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DrawerListDashBoard from "../DrawerListDashBoard";
import CategoryItemDaxhBoard from "./CategoryItemDaxhBoard";

export default function CategoryDachBoard() {
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [categoryError, setCategoryError] = useState(null);
  const [CategoryList, setCategoryList] = useState([]);

  const getCategoryData = async () => {
    try {
      const response = await axios.get(
        "https://tanzanite-store-back-end.onrender.com/api/v1/Categories"
      );
      setCategoryList(response.data);
      console.log("API Category Response:", response.data);
      setLoadingCategory(false);
    } catch (error) {
      console.error("Error fetching Category products from dachboard: ", error);
      setCategoryError("Failed to fetch the Category product from dachboard");
      setLoadingCategory(false);
    }
  };

  // Effect for category Data
  useEffect(() => {
    getCategoryData();
  }, []);
  console.log("Catigory list from dachboard:", CategoryList);

  //Create New Category

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  // get information from form
  const [categoryInfo, setCategoryInfo] = useState({
    categoryName: "",
    categoryImage: "",
  });

  function onChangeHandler(event) {
    setCategoryInfo({
      ...categoryInfo,
      [event.target.name]: event.target.value,
    });
  }

  console.log("Category Info", categoryInfo);

  // send request to backend
  function CreateNewCategory() {
    const token = localStorage.getItem("token");
    const url =
      "https://tanzanite-store-back-end.onrender.com/api/v1/Categories";
    axios
      .post(url, categoryInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Caregory is created successfully ");
          closepopup();
          getCategoryData();
          categoryInfo({
            categoryName: "",
            categoryImage: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Categoies List</h1>
      <DrawerListDashBoard />
      {/* create new category form  */}
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
            Create New Category
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                name="categoryName"
                onChange={onChangeHandler}
                variant="outlined"
                label="Category Name"
              ></TextField>
              <TextField
                name="categoryImage"
                onChange={onChangeHandler}
                variant="outlined"
                label="Category Image"
              ></TextField>
              <Button
                onClick={CreateNewCategory}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Table  */}
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
              <TableCell>Categories ID</TableCell>
              <TableCell>Categories Name</TableCell>
              <TableCell>Categories Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CategoryList.map((category) => {
              return (
                <CategoryItemDaxhBoard
                  key={category.categoryId}
                  category={category}
                  getCategoryData={getCategoryData}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
