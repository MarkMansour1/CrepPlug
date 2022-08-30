import React, { useEffect, useState } from "react";
import { Link, graphql, navigate } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Banner from "../components/banner";
import SingleProduct from "../components/single-product";
import Filters from "../components/filters";
import ProductBlock from "../components/block-product";
import { RightArrow, UpChevron, DownChevron } from "../components/svg";

import {
    applyFilters,
    applySort,
    mostPopularFunction,
} from "../services/filters";

import dcreaselogo from "../images/dcrease/dcrease-logo.png";
import useSWR from "swr";
import fetcher from "../services/fetcher";
import Loader from "../components/loader";

import Skeleton from "react-loading-skeleton";

const ShopPage = ({ data }) => {
    const [state, setState] = useState({
        minPrice: null,
        maxPrice: null,
        categories: [],
        conditions: [],
        sizes: [],
        colours: [],
        search: "",
        sort: "recent",
        items: [],
        soldItems: [],
        filtersClosed: false,
    });

    const { data: products, loading, error } = useSWR(
        `wp-json/wc/v3/products?per_page=100`,
        fetcher
    );
    const { data: productCategories } = useSWR(
        `wp-json/wc/v3/products/categories`,
        fetcher
    );

    const filterProducts = () => {
        if (!products) return;

        // var productLists = applyFilters(state, products.slice())

        let productLists = {
            sold: [],
            unsold: products,
        };

        setState({
            ...state,
            items: productLists.unsold,
            soldItems: productLists.sold,
        });
    };

    const handleSorterChange = (event) => {
        var value = event.target.value;
        var productList = state.items.slice();
        productList = applySort(value, productList);

        setState({
            ...state,
            sort: value,
            items: productList,
        });
    };

    const url = typeof window !== "undefined" ? window.location.search : "";
    const urlParams = new URLSearchParams(url);
    const searchString = urlParams.get("search") ? urlParams.get("search") : "";

    useEffect(() => {
        setState({
            ...state,
            items: products ?? [],
            search: searchString,
            urlSearch: searchString,
        });

        filterProducts();
    }, [products, searchString]);

    var conditions = ["New", "Used"];
    var categories = [];
    var colours = [];
    var sizes = [];

    const exclude = ["New", "Used", "All", "Uncategorized", "Accessories"];
    productCategories?.map((category) => {
        if (!exclude.includes(category.name)) {
            categories.push(category.name);
        }
    });

    products?.map((product) => {
        product.attributes.map((attribute) => {
            if (attribute.name == "Size") {
                attribute?.options.map((option) => {
                    if (!sizes.includes(option)) {
                        sizes.push(option);
                    }
                });
            } else if (attribute.name == "Colour") {
                attribute?.options.map((option) => {
                    if (!colours.includes(option)) {
                        colours.push(option);
                    }
                });
            }
        });
    });
    // Puts the sizes in order
    sizes.sort((a, b) => a - b);

    return (
        <Layout>
            <Seo title="Shop" />
            <Banner
                details={[
                    "crepplug shop",
                    "On CrepPlug, you can Buy and Sell New Trainers or Used Trainers, exclusive Custom Air Force 1, Nikes, Jordan’s, Yeezy’s and much more for the cheapest prices on the market.",
                    data.banner.childImageSharp.fluid,
                    false,
                ]}
            />
            <div className="container container-wide pt-4 pt-md-0">
                {/* <ProductBlock
                    title="Most Popular"
                    link="/shop"
                    linkText="Shop All"
                    products={products?.slice(0, 10) ?? []}
                /> */}
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="row">
                            <div className="col sticky">
                                <Filters
                                    state={state}
                                    setState={setState}
                                    filterProducts={filterProducts}
                                    conditions={conditions}
                                    categories={categories}
                                    colours={colours}
                                    sizes={sizes}
                                />
                                <div className="shop-filters-header">
                                    <div>
                                        {state.items.length > 0 ? (
                                            <>
                                                Showing 1-{state.items.length}{" "}
                                                {state.search.length > 0
                                                    ? `of results for "${state.search}"`
                                                    : "of items"}
                                            </>
                                        ) : (
                                            "Loading items..."
                                        )}
                                    </div>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={handleSorterChange}
                                    >
                                        <option value="recent">
                                            Sort By: Most Recent
                                        </option>
                                        <option value="popular">
                                            Sort By: Most Popular
                                        </option>
                                        <option value="priceasc">
                                            Sort By: Lowest Price
                                        </option>
                                        <option value="pricedesc">
                                            Sort By: Highest Price
                                        </option>
                                    </select>
                                </div>
                                <div className="shop-banner d-none d-md-block">
                                    <a
                                        href={`${process.env.GATSBY_SITE_URL}/product/d-crease-insert`}
                                    >
                                        <BackgroundImage
                                            Tag="div"
                                            fluid={
                                                data.dcrease.childImageSharp
                                                    .fluid
                                            }
                                        >
                                            <div className="shop-banner-container">
                                                <div>
                                                    <img
                                                        src={dcreaselogo}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="dcrease-txt">
                                                    Go
                                                    <span>
                                                        Crease <br /> Free
                                                    </span>
                                                </div>
                                                <div className="dcrease-link">
                                                    A CrepPlug verified <br />{" "}
                                                    crease preventer{" "}
                                                    <RightArrow />
                                                </div>
                                            </div>
                                        </BackgroundImage>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="justify-content-between align-items-center d-none d-md-flex py-4">
                            <div>
                                {state.items.length > 0 ? (
                                    <>
                                        Showing 1-{state.items.length}{" "}
                                        {state.search.length > 0
                                            ? `of results for "${state.search}"`
                                            : "of items"}
                                    </>
                                ) : (
                                    <>Loading items...</>
                                )}
                            </div>
                            <select
                                className="form-control form-control-sm"
                                onChange={handleSorterChange}
                                style={{ maxWidth: "300px" }}
                            >
                                <option value="recent">
                                    Sort By: Most Recent
                                </option>
                                <option value="popular">
                                    Sort By: Most Popular
                                </option>
                                <option value="priceasc">
                                    Sort By: Lowest Price
                                </option>
                                <option value="pricedesc">
                                    Sort By: Highest Price
                                </option>
                            </select>
                        </div>
                        <div className="row">
                            {state.items.length > 0
                                ? state.items.map((product) => {
                                      return (
                                          <>
                                              <div
                                                  className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                                                  key={product.id}
                                              >
                                                  <SingleProduct
                                                      product={product}
                                                  />
                                              </div>
                                          </>
                                      );
                                  })
                                : Array(24)
                                      .fill(0)
                                      .map(() => {
                                          return (
                                              <div className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4">
                                                  <Skeleton height={200} />
                                              </div>
                                          );
                                      })}
                        </div>
                        <div className="row mt-5">
                            {state.soldItems.map((product) => {
                                return (
                                    <>
                                        <div
                                            className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                                            key={`${product.id}-sold`}
                                        >
                                            <SingleProduct product={product} />
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ShopPage;

export const query = graphql`
    query {
        banner: file(relativePath: { eq: "banners/crep.jpg" }) {
            childImageSharp {
                fluid(maxHeight: 175) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
        dcrease: file(relativePath: { eq: "dcrease/banner.jpg" }) {
            childImageSharp {
                fluid(quality: 100, maxWidth: 250) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
    }
`;
