import React from "react"
import { Link } from "gatsby"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const PageComponent = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container container-wide py-5">
      <h4>Brand Colours</h4>
      <div className="row w-25">
        <div className="col-6">
          <div className="p-5 mb-3" style={{ background: "black" }} />
          <h5 className="mb-1">Primary</h5>
          <p>#000</p>
        </div>
        <div className="col-6">
          <div className="p-5 mb-3" style={{ background: "#23a1d3" }} />
          <h5 className="mb-1">Secondary</h5>
          <p>#23a1d3</p>
        </div>
      </div>
      <h3 className="mt-4">Monochrome Palette</h3>
      <div className="row w-50">
        <div className="col-3">
          <div className="p-5 mb-3" style={{ background: "#222" }} />
          <h5 className="mb-1">Dark</h5>
          <p>#222</p>
        </div>
        <div className="col-3">
          <div className="p-5 mb-3" style={{ background: "#333" }} />
          <h5 className="mb-1">Dark Grey</h5>
          <p>#333</p>
        </div>
        <div className="col-3">
          <div className="p-5 mb-3" style={{ background: "#777777" }} />
          <h5 className="mb-1">Grey</h5>
          <p>#777</p>
        </div>
        <div className="col-3">
          <div className="p-5 mb-3" style={{ background: "#f0f0f0" }} />
          <h5 className="mb-1">Light</h5>
          <p>#F0F0F0</p>
        </div>
      </div>
      <h4 className="mt-4">System Colours</h4>
      <div className="row w-50">
        <div className="col-3">
          <div className="p-5 mb-3 bg-success" />
          <h5 className="mb-1">Success</h5>
          <p>#28A745</p>
        </div>
        <div className="col-3">
          <div className="p-5 mb-3 bg-danger" />
          <h5 className="mb-1">Danger</h5>
          <p>#DC3545</p>
        </div>
        <div className="col-3">
          <div className="p-5 mb-3 bg-warning" />
          <h5 className="mb-1">Warning</h5>
          <p>#FFC107</p>
        </div>
        <div className="col-3">
          <div className="p-5 mb-3 bg-info" />
          <h5 className="mb-1">Info</h5>
          <p>#17A2B8</p>
        </div>
      </div>
      <h4 className="mt-5">Typography</h4>
      <h1>H1 - Montserrat 700</h1>
      <h2>H2 - Eurostyle 700</h2>
      <h3>H3 - Montserrat 700</h3>
      <h4>H4 - Eurostyle 600</h4>
      <h5>H5 - Eurostyle 600</h5>
      <h6>H6 - Eurostyle 600</h6>
      <p>P - Eurostyle 400</p>

      <h4 className="mt-5">Buttons</h4>
      <div className="btn btn-primary btn-lg mr-3">Click Here</div>
      <div className="btn btn-primary mr-3">Click Here</div>
      <div className="btn btn-primary btn-sm mr-5">Click Here</div>
      <div className="btn btn-secondary btn-lg mr-3">Click Here</div>
      <div className="btn btn-secondary mr-3">Click Here</div>
      <div className="btn btn-secondary btn-sm mr-3">Click Here</div>
      <br />
      <br />
      <div className="btn btn-outline-primary btn-lg mr-3">Click Here</div>
      <div className="btn btn-outline-primary mr-3">Click Here</div>
      <div className="btn btn-outline-primary btn-sm mr-5">Click Here</div>
      <div className="btn btn-outline-secondary btn-lg mr-3">Click Here</div>
      <div className="btn btn-outline-secondary mr-3">Click Here</div>
      <div className="btn btn-outline-secondary btn-sm mr-3">Click Here</div>
      <h4 className="mt-5">Forms</h4>
      <form className="w-75">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">First Name</label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Last Name</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div className="form-group w-25">
          <label>Upload a photo</label>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" />
            <label className="custom-file-label" htmlFor="customFile">
              Choose file
            </label>
          </div>
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="identifier"
            />
            <label className="custom-control-label" htmlFor="identifier">
              Check this custom checkbox
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Form
        </button>
      </form>
      <h4 className="mt-5">Accordion</h4>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  </Layout>
)

export default PageComponent
