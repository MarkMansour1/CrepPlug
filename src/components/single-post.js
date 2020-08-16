import React from "react"
import { Link } from "gatsby"

import defaultimg from "../images/sourcing.jpg"

class Single extends React.Component {
  render() {
    var post = this.props.data

    return (
      <div className="single-post">
        <Link to={`/blog/${post.slug}`}>
          <div className="img-container-sm">
            {post.featuredImage &&
            post.featuredImage.node &&
            post.featuredImage.node.sourceUrl ? (
              <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
            ) : (
              <img src={defaultimg} alt="" />
            )}
          </div>
        </Link>
        <div className="post-categories">
          {post.categories.nodes.map(({ name: name }) => (
            <div className="post-category" key={name}>
              {name}
            </div>
          ))}
        </div>
        <Link to={`/blog/${post.slug}`}>
          <div className="post-title">{post.title}</div>
        </Link>
        {post == "true" ? (
          <div className="post-excerpt">
            <span
              dangerouslySetInnerHTML={{
                __html: post.excerpt,
              }}
            />
          </div>
        ) : null}
        <div className="post-date">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-calendar-event-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm12.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
            />
          </svg>
          {post.date}
        </div>
      </div>
    )
  }
}

export default Single
