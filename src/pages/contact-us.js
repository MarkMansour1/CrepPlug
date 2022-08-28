import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

class PageComponent extends React.Component {
    render() {
        return (
            <Layout>
                <Seo title="Contact Us" />
                <div className="layout-minimal">
                    <h2>Contact Us</h2>
                    <p className="text-gray mb-4">
                        Before contacting the support team be sure to look at
                        our{" "}
                        <Link
                            to="/faqs"
                            className="text-secondary"
                            target="_blank"
                        >
                            FAQs
                        </Link>
                        .
                    </p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="listing">
                                Listing URL (Optional)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="listing"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Reason for request</label>
                            <input
                                type="text"
                                className="form-control"
                                id="reason"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="3"
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload a photo</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="customFile"
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                >
                                    Choose file
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-secondary w-100"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default PageComponent;
