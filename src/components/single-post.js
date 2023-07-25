import React from "react"
import { Link } from "gatsby"

import { Calendar } from "../components/svg"
import defaultimg from "../images/default_product.png"
import { timeSince } from "../services/utils"

const SinglePost = ({ post, excerpt }) => {
  const image = post?.better_featured_image?.source_url ?? defaultimg

  return (
    <div className="single-post">
      <Link to={`/blog/${post.id}`}>
        <div className="img-container-sm">
          <img src={image} alt={post?.title?.rendered} />
        </div>
      </Link>
      {/* <div className="post-categories">
        {post.categories.nodes?.map(({ name: name }) => (
          <div className="post-category" key={name}>
            {name}
          </div>
        ))}
      </div> */}
      <Link to={`/blog/${post.id}`}>
        <div className="post-title">{post?.title?.rendered}</div>
      </Link>
      {excerpt ? (
        <div className="post-excerpt">
          <span
            dangerouslySetInnerHTML={{
              __html: post?.excerpt?.rendered,
            }}
          />
        </div>
      ) : null}
      <div className="post-date">
        <Calendar />
        {timeSince(post.date)}
      </div>
    </div>
  )
}

export default SinglePost
