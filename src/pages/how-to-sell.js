import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

class PageComponent extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <Layout>
                <Seo title="How To Sell" />
                <div className="container container-wide pt-5 text-center">
                    <h2 className="text-uppercase">Selling on CrepPlug</h2>
                    <div className="row my-5 pt-4 hts-row">
                        <div className="col-12 col-lg-4">
                            <Img
                                fluid={data.list.childImageSharp.fluid}
                                className="img-fluid"
                                alt=""
                            />
                            <h4>List</h4>
                            <p>
                                You create a listing of the shoe you want to
                                sell.
                            </p>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Img
                                fluid={data.view.childImageSharp.fluid}
                                className="img-fluid"
                                alt=""
                            />
                            <h4>View</h4>
                            <p>
                                We promote your item on all our socials. A buyer
                                views and purchases the item from our website.
                            </p>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Img
                                fluid={data.sellwin.childImageSharp.fluid}
                                className="img-fluid"
                                alt=""
                            />
                            <h4>Win</h4>
                            <p>
                                You get paid directly into your account, ready
                                to ship the shoes off to the buyer..
                            </p>
                        </div>
                    </div>
                    <a
                        href={`${process.env.GATSBY_SITE_URL}/register/`}
                        className="btn btn-secondary btn-lg mt-4"
                    >
                        Start Selling
                    </a>
                    <hr style={{ margin: "100px 0" }} />
                    <h2 className="text-uppercase">Buying on CrepPlug</h2>
                    <div className="row my-5 pt-4 hts-row">
                        <div className="col-12 col-lg-4">
                            <Img
                                fluid={data.find.childImageSharp.fluid}
                                className="img-fluid"
                                alt=""
                            />
                            <h4>Find</h4>
                            <p>
                                Browse through hundreds of pairs and find your
                                special one.
                            </p>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Img
                                fluid={data.buy.childImageSharp.fluid}
                                className="img-fluid"
                                alt=""
                            />
                            <h4>Buy</h4>
                            <p>
                                Purchase your crep with a few clicks of a
                                button.
                            </p>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Img
                                fluid={data.buywin.childImageSharp.fluid}
                                className="img-fluid"
                                alt=""
                            />
                            <h4>Win</h4>
                            <p>
                                The seller ships the trainers to you. Enjoy your
                                new kicks!
                            </p>
                        </div>
                    </div>
                    <Link to="/shop" className="btn btn-secondary btn-lg">
                        Shop the feed
                    </Link>
                </div>
            </Layout>
        );
    }
}

export default PageComponent;

export const htsImage = graphql`
    fragment htsImage on File {
        childImageSharp {
            fluid(maxWidth: 300, maxHeight: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;

export const pageQuery = graphql`
    query {
        banner: file(relativePath: { eq: "banners/collections.jpg" }) {
            childImageSharp {
                fluid(maxHeight: 175) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
        list: file(relativePath: { eq: "howtosell/list.png" }) {
            ...htsImage
        }
        view: file(relativePath: { eq: "howtosell/view.png" }) {
            ...htsImage
        }
        sellwin: file(relativePath: { eq: "howtosell/sellwin.png" }) {
            ...htsImage
        }
        find: file(relativePath: { eq: "howtosell/find.png" }) {
            ...htsImage
        }
        buy: file(relativePath: { eq: "howtosell/buy.png" }) {
            ...htsImage
        }
        buywin: file(relativePath: { eq: "howtosell/buywin.png" }) {
            ...htsImage
        }
    }
`;
