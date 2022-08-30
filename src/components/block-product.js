import React, { useState } from "react";
import { Link } from "gatsby";

import { RightArrow } from "../components/svg";
import SingleProduct from "./single-product";
import Skeleton from "react-loading-skeleton";

const Block = ({ title, link, linkText, products }) => {
    return (
        <>
            <div className="block-wrapper">
                <div className="block-header">
                    <h3>{title}</h3>
                    <Link to={link} className="link-flat text-secondary">
                        {`${linkText} `}
                        <RightArrow />
                    </Link>
                </div>
                <div className="block-body">
                    {products.length > 1 ? (
                        products.map((product) => (
                            <div className="block-product" key={product.id}>
                                <SingleProduct product={product} />
                            </div>
                        ))
                    ) : (
                        <Skeleton
                            count={10}
                            width={150}
                            height={150}
                            inline
                            className="mr-3"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Block;
