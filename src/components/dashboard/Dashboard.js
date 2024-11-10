import React from "react";

import { Link } from "react-router-dom";
import TodoList from "./admidTodoList/TodoList";
export default function Dashboard(prop) {
    const {userData}=prop;
  return (
    <div>
      <Link to="/jewelry-dashboard">Jewelry Priduct</Link>
      {/* <br/>
      <Link>Gemstone </Link>
      <br/>
      <Link>Category</Link> */}
      <br/>
      <Link to="/users-dashboard">Users</Link>
      <br/>
      <Link>Orders</Link>
      <TodoList userData = {userData}/>
    </div>
  );
}
