import React from 'react'

export default function OrderDitails(prop) {
  const { item } = prop;
  console.log(item);
  return (
    <tbody>
      <tr>
        <th scope="row">{item.jewelry.jewelryName}</th>
        <td>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
            }}
          >
            <img
              src={item.jewelry.jewelryImage[0]}
              alr={item.jewelry.jewelryName}
            />
          </div>
        </td>
        <td>{item.jewelry.jewelryPrice}</td>
        <td>{item.jewelry.gemstone.gemstoneName}</td>
        <td>${item.jewelry.gemstone.gemstonePrice}</td>
        <td>${item.jewelry.finalProductPrice}</td>
        <td>{item.quantity}</td>
      </tr>
    </tbody>
  )
}
