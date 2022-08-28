import React from "react";
import { Link, navigate } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const PageComponent = () => {
    const url = typeof window !== "undefined" ? window.location.search : "";
    const urlParams = new URLSearchParams(url);

    var product = false;
    if (urlParams.has("product")) {
        product = urlParams.get("product");
    } else {
        typeof window !== "undefined" && navigate("/");
    }

    return (
        <Layout>
            <Seo title="Success" />
            <div className="container pt-5 text-center">
                <h2>Product Added Successfully</h2>
                <Link
                    to={`/product/${product}`}
                    className="btn btn-primary my-4 mr-2"
                >
                    View Product
                </Link>
                <Link to="/sell" className="btn btn-primary my-4 ml-2">
                    Add Another
                </Link>
            </div>
        </Layout>
    );
};

export default PageComponent;
