import React from 'react'

import Pagination from "@mui/material/Pagination";
export default function ProductPagination(prop) {
    const { totalCount, page, handleChange, limit } = prop;
      const total = Math.ceil(totalCount / limit);
      console.log(total);
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={total} page={page} onChange={handleChange} />
        </div>
  )
}
