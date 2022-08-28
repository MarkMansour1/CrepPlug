import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

class PageComponent extends React.Component {
    render() {
        const { data } = this.props;
        const page = { content: "" };

        return (
            <Layout>
                <Seo title="Privacy Policy" />
                <div className="container pt-5">
                    <div className="text-center mb-5">
                        <h1>Privacy Policy</h1>
                        <p>This Agreement was last modified on {page.date}</p>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: page.content,
                        }}
                    ></div>
                </div>
            </Layout>
        );
    }
}

export default PageComponent;
