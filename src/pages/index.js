import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";

import Layout from "../components/layout";
import Seo from "../components/seo";
import ProductBlock from "../components/block-product";
import PostBlock from "../components/block-post";
import { RightArrow } from "../components/svg";

import { mostPopularFunction } from "../services/filters";
import { shuffle } from "../services/utils";
import useSWR from "swr";
import fetcher from "../services/fetcher";

const IndexPage = ({ data }) => {
    const { data: products } = useSWR(
        "wp-json/wc/v3/products?per_page=100",
        fetcher
    );
    const { data: posts } = useSWR("wp-json/wp/v2/posts", fetcher);

    const { buy, sell, source } = data;
    const { nike, adidas, jordan, puma, yeezy, vans } = data;

    const brands = [
        { name: "Nike", image: nike },
        { name: "Adidas", image: adidas },
        { name: "Jordan", image: jordan },
        { name: "Puma", image: puma },
        { name: "Yeezy", image: yeezy },
        { name: "Vans", image: vans },
    ];

    return (
        <Layout>
            <Seo title="Making Buying & Selling Trainers Easy" />
            <div className="container container-wide pt-5 pt-md-4">
                <div className="row home-row">
                    <div className="col-12 col-lg-8">
                        <BackgroundImage
                            Tag="div"
                            fluid={buy.childImageSharp.fluid}
                        >
                            <div className="home-section home-buy">
                                <div>
                                    <h1>
                                        UK’s Biggest Sneaker{" "}
                                        <span>Marketplace</span>
                                    </h1>
                                    <Link
                                        to="/shop"
                                        className="btn btn-outline-light btn-lg"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </BackgroundImage>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <BackgroundImage
                            Tag="div"
                            fluid={sell.childImageSharp.fluid}
                        >
                            <div className="home-section home-sell">
                                <div>
                                    <h2>
                                        Sell your <span>trainers here</span>
                                    </h2>
                                    <Link
                                        to="/sell"
                                        className="btn btn-outline-light"
                                    >
                                        Start Selling
                                    </Link>
                                </div>
                            </div>
                        </BackgroundImage>
                    </div>
                    <div className="col-12 col-lg-8 d-none d-lg-block">
                        <ProductBlock
                            title="Most Popular"
                            link="/shop"
                            linkText="Shop All"
                            products={
                                products
                                    ?.slice()
                                    ?.sort(mostPopularFunction)
                                    ?.filter(
                                        (product) => product.stock_quantity > 0
                                    )
                                    ?.slice(0, 10) ?? []
                            }
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <BackgroundImage
                            Tag="div"
                            fluid={source.childImageSharp.fluid}
                        >
                            <div className="home-section home-source">
                                <div>
                                    <h2>
                                        Request a pair <span>of trainers</span>
                                    </h2>
                                    <Link
                                        to="/sourcing"
                                        className="btn btn-outline-light"
                                    >
                                        Sourcing
                                    </Link>
                                </div>
                            </div>
                        </BackgroundImage>
                    </div>
                </div>
                <div className="block-wrapper">
                    <div className="block-header">
                        <h3>Shop By Brand</h3>
                        <Link to="/shop" className="link-flat text-secondary">
                            Shop All <RightArrow />
                        </Link>
                    </div>
                    <div className="block-body row pb-0">
                        {brands.map((brand, index) => (
                            <div
                                className={`col-4 col-md-3 col-xl-2 ${
                                    index < 3 ? "mb-xl-0 mb-4" : ""
                                }`}
                                key={brand.name}
                            >
                                <Link
                                    to={`/shop?search=${brand.name.toLowerCase()}`}
                                >
                                    <Img
                                        fluid={
                                            brand.image.childImageSharp.fluid
                                        }
                                        alt={brand.name}
                                        style={{
                                            border: "1px solid #dee4ea",
                                        }}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <ProductBlock
                    title="Latest Footwear"
                    link="/shop"
                    linkText="Shop All"
                    products={products ?? []}
                />
                <PostBlock
                    title="From The Blog"
                    link="/blog"
                    linkText="Read More"
                    posts={posts ?? []}
                />
            </div>
        </Layout>
    );
};

export default IndexPage;

export const homeImage = graphql`
    fragment homeImage on File {
        childImageSharp {
            fluid(maxWidth: 1000, maxHeight: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;
export const brandImage = graphql`
    fragment brandImage on File {
        childImageSharp {
            fluid(maxWidth: 300, maxHeight: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`;

export const query = graphql`
    query {
        buy: file(relativePath: { eq: "index/buy.jpg" }) {
            ...homeImage
        }
        sell: file(relativePath: { eq: "index/sell.jpg" }) {
            ...homeImage
        }
        source: file(relativePath: { eq: "index/source.jpg" }) {
            ...homeImage
        }
        nike: file(relativePath: { eq: "brands/nike.png" }) {
            ...brandImage
        }
        adidas: file(relativePath: { eq: "brands/adidas.png" }) {
            ...brandImage
        }
        jordan: file(relativePath: { eq: "brands/jordan.png" }) {
            ...brandImage
        }
        puma: file(relativePath: { eq: "brands/puma.png" }) {
            ...brandImage
        }
        yeezy: file(relativePath: { eq: "brands/yeezy.png" }) {
            ...brandImage
        }
        vans: file(relativePath: { eq: "brands/vans.png" }) {
            ...brandImage
        }
    }
`;
