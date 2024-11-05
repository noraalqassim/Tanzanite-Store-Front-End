import React from 'react';
import WishList from "../components/wishList/WishList";

export default function WishListPage(props) {
    const { wishList, setWishList } = props;

    return (
        <div>
            <WishList wishList={wishList} setWishList={setWishList} />
        </div>
    );
}