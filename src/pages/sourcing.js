import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Banner from "../components/banner";

class PageComponent extends React.Component {
    state = {
        email: "",
        model: "",
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        if (window.history.state) {
            this.setState({ model: window.history.state.name });
        }
    }

    render() {
        const { data } = this.props;

        const reviews = [
            data.img4,
            data.img1,
            data.img2,
            data.img3,
            data.img7,
            data.img9,
            data.img56,
            data.img3462,
        ];

        return (
            <Layout>
                <Seo title="Sourcing" />
                <Banner
                    details={[
                        "sourcing",
                        "If you can't find what you're looking for you can contact us to source your desired product and we'll deliver them straight to you.",
                        data.banner.childImageSharp.fluid,
                        false,
                    ]}
                />
                <div className="container container-wide pt-5">
                    <h1 className="d-md-none pt-3">Sourcing</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <p className="text-gray">
                                We know it can be quite difficult nowadays to
                                find sold out trainers you’ve been looking all
                                around for, so we solve that problem and source
                                them for you.
                            </p>
                            <h4>The Process is Simple:</h4>
                            <p className="text-gray">
                                You request an item, we find the item that has
                                been requested and then we provide you with a
                                quote for your item. The item will then be
                                posted to the delivery address you give us once
                                payment has been received and you’ll be updated
                                with a tracking reference shortly after.
                            </p>
                            <p>
                                We want you to have the best experience possible
                                so we ensure that we provide fast response,
                                competitive prices and a fast delivery time.
                            </p>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-7 contactform m-0 pl-md-5">
                            <form
                                name="sourcing"
                                method="POST"
                                data-netlify="true"
                            >
                                <input
                                    type="hidden"
                                    name="form-name"
                                    value="sourcing"
                                />
                                <div className="form-group">
                                    <label htmlhtmlFor="email">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlhtmlFor="model">
                                        Trainer Model *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="model"
                                        name="model"
                                        value={this.state.model}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlhtmlFor="size">UK Size *</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="size"
                                        min="1"
                                        max="13"
                                        step="0.5"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="instagram">
                                        Instagram * (Expect to receive an
                                        invoice within two hours)
                                    </label>
                                    <input
                                        type="text"
                                        id="instagram"
                                        name="instagram"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="notes">Notes</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        className="form-control"
                                        rows="5"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Upload a photo</label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="attachments"
                                        />
                                        <label
                                            className="custom-file-label"
                                            htmlhtmlFor="attachments"
                                        >
                                            Choose file
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    <h3 className="mt-5">Recent Customers</h3>
                    <p className="text-gray">
                        Feel free to look through the full list{" "}
                        <a
                            href="https://www.instagram.com/stories/highlights/17927696740132330/"
                            target="_blank"
                            style={{ color: "#007bff" }}
                        >
                            here
                        </a>
                    </p>
                    <div className="row">
                        {reviews.map((review) => (
                            <div className="col-6 col-sm-4 col-lg-3 mb-4">
                                <Img
                                    fluid={review.childImageSharp.fluid}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }
}

export const sourcingImage = graphql`
    fragment sourcingImage on File {
        childImageSharp {
            fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

export const pageQuery = graphql`
    query {
        banner: file(relativePath: { eq: "banners/sourcing.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        img1: file(relativePath: { eq: "sourcing/1.PNG" }) {
            ...sourcingImage
        }
        img2: file(relativePath: { eq: "sourcing/2.PNG" }) {
            ...sourcingImage
        }
        img3: file(relativePath: { eq: "sourcing/3.PNG" }) {
            ...sourcingImage
        }
        img4: file(relativePath: { eq: "sourcing/4.PNG" }) {
            ...sourcingImage
        }
        img5: file(relativePath: { eq: "sourcing/5.PNG" }) {
            ...sourcingImage
        }
        img7: file(relativePath: { eq: "sourcing/7.PNG" }) {
            ...sourcingImage
        }
        img8: file(relativePath: { eq: "sourcing/8.PNG" }) {
            ...sourcingImage
        }
        img9: file(relativePath: { eq: "sourcing/9.PNG" }) {
            ...sourcingImage
        }
        img56: file(relativePath: { eq: "sourcing/56.PNG" }) {
            ...sourcingImage
        }
        img3462: file(relativePath: { eq: "sourcing/3462.PNG" }) {
            ...sourcingImage
        }
    }
`;

export default PageComponent;
