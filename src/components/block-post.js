import React from "react";
import { Link } from "gatsby";

import { RightArrow } from "../components/svg";
import SinglePost from "./single-post";

const Block = ({ title, link, linkText, posts }) => (
    <div className="block-wrapper">
        <div className="block-header">
            <h3>{title}</h3>
            <Link to={link} className="link-flat text-secondary">
                {`${linkText} `}
                <RightArrow />
            </Link>
        </div>
        <div className="block-body">
            {posts?.map((post) => (
                <div className="block-post" key={post.id}>
                    <SinglePost post={post} />
                </div>
            ))}
        </div>
    </div>
);

export default Block;
