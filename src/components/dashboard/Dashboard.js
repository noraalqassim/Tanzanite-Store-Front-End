import React from "react";

import TodoList from "./admidTodoList/TodoList";
import DrawerListDashBoard from "./DrawerListDashBoard";
export default function Dashboard(prop) {
  const { userData } = prop;

  return (
    <div>
      <DrawerListDashBoard />
      <TodoList userData={userData} />
    </div>
  );
}
