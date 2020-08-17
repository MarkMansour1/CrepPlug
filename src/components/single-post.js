import React from "react"
import { Link } from "gatsby"

import { Calendar } from "../components/svg"
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
          <Calendar />
          {post.date}
        </div>
      </div>
    )
  }
}

export default Single
