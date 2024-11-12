import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItemDashBoard from "./UserItemDashBoard";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import DrawerListDashBoard from "../DrawerListDashBoard";
export default function UsersDashBoard() {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState(null);
  const [userList, setUserList] = useState([]);

  const getUsersList = async () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/User";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserList(response.data);
      setLoadingUsers(false);
      console.log("API Users Response:", response.data);
    } catch (error) {
      console.error("Error fetching Users List from dashboard: ", error);
      setUsersError("Failed to fetch the Users List from dashboard");
      setLoadingUsers(false);
    }
  };

  // Effect for User List
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
    >
      <DrawerListDashBoard/>
      <div style={{ width: "1100px" }}>
        <h2 style={{ textAlign: "center" }}>Users List</h2>
        <Table
          size="small"
          style={{ border: "1px solid #ccc", borderRadius: "20px" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <UserItemDashBoard
                key={user.userId}
                user={user}
                getUsersList={getUsersList}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
