import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItemDashBoard from "./UserItemDashBoard";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
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
    <div>
      <h2>Users Dashboard</h2>
      <div
        style={{
          marginTop: "25px",
        }}
      >
        <Table>
          <TableHead>
              <h4>User Table</h4>
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
