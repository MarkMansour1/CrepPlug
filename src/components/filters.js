import React from "react";
import { navigate } from "gatsby";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import { Filters as FiltersIcon } from "../components/svg";

const Filters = ({
    state,
    setState,
    filterProducts,
    conditions,
    categories,
    sizes,
    colours,
}) => {
    const toggleFilters = () => {
        setState({
            ...state,
            filtersClosed: !state.filtersClosed,
        });
    };

    // const clearFilters = () => {
    //     setState({
    //         ...state,
    //         minPrice: null,
    //         maxPrice: null,
    //         categories: [],
    //         conditions: [],
    //         sizes: [],
    //         colours: [],
    //         search: "",
    //     });

    //     navigate("/shop");
    //     filterProducts();
    // };

    const handleFilterChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "minPrice" || name === "maxPrice") {
            setState({ ...state, [name]: parseFloat(value) });
        } else if (name === "search") {
            setState({ ...state, search: value });
        } else {
            var stateValues = state[name];
            var index = stateValues.indexOf(value);
            index > -1 ? stateValues.splice(index, 1) : stateValues.push(value);
            setState({ ...state, [name]: stateValues });
        }
        filterProducts();
    };

    return (
        <>
            <h3 className="shop-filters-title" onClick={toggleFilters}>
                <div>
                    <FiltersIcon size=".75em" />
                    {` Filters`}
                </div>
                <span>{state.filtersClosed ? "+" : "-"}</span>
            </h3>
            <div id="shop-filters-wrapper">
                <div
                    id="shop-filters"
                    className={`shop-filters ${
                        state.filtersClosed ? "shop-filters-closed" : ""
                    }`}
                >
                    <Accordion>
                        <Card>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="form-group">
                                        <label htmlFor="search" />
                                        <input
                                            id="search"
                                            name="search"
                                            className="form-control"
                                            type="text"
                                            value={state.search}
                                            onChange={handleFilterChange}
                                            placeholder="Search..."
                                        />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Search
                                <span className="badge badge-light ml-3">
                                    {state.search?.length > 0 && "1"}
                                </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <label htmlFor="minPrice" />
                                            <input
                                                id="minPrice"
                                                className="form-control"
                                                label="Min"
                                                type="number"
                                                min="0"
                                                step="10"
                                                placeholder="Min"
                                                name="minPrice"
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="maxPrice" />
                                            <input
                                                id="maxPrice"
                                                className="form-control"
                                                label="Max"
                                                type="number"
                                                min="10"
                                                step="10"
                                                placeholder="Max"
                                                name="maxPrice"
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                Price Range
                                <span className="badge badge-light ml-3">
                                    {state.minPrice && state.maxPrice
                                        ? "2"
                                        : state.minPrice || state.maxPrice
                                        ? "1"
                                        : null}
                                </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    {categories?.map((filter) => (
                                        <div
                                            className="form-check"
                                            key={filter}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={filter}
                                                id={filter}
                                                name="categories"
                                                onChange={handleFilterChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={filter}
                                            >
                                                {filter}
                                            </label>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Categories
                                <span className="badge badge-light ml-3">
                                    {state.categories.length > 0 &&
                                        state.categories.length}
                                </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    {conditions?.map((filter) => (
                                        <div
                                            className="form-check"
                                            key={filter}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={filter}
                                                id={filter}
                                                name="conditions"
                                                onChange={handleFilterChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={filter}
                                            >
                                                {filter}
                                            </label>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                Condition
                                <span className="badge badge-light ml-3">
                                    {state.conditions.length > 0 &&
                                        state.conditions.length}
                                </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                    {sizes?.map((filter) => (
                                        <div
                                            className="form-check"
                                            key={filter}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={filter}
                                                id={filter}
                                                name="sizes"
                                                onChange={handleFilterChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={filter}
                                            >
                                                {filter}
                                            </label>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="4">
                                Size
                                <span className="badge badge-light ml-3">
                                    {state.sizes.length > 0 &&
                                        state.sizes.length}
                                </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse eventKey="5">
                                <Card.Body>
                                    {colours?.map((filter) => (
                                        <div
                                            className="form-check"
                                            key={filter}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={filter}
                                                id={filter}
                                                name="colours"
                                                onChange={handleFilterChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={filter}
                                            >
                                                {filter}
                                            </label>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="5">
                                Colour
                                <span className="badge badge-light ml-3">
                                    {state.colours.length > 0 &&
                                        state.colours.length}
                                </span>
                            </Accordion.Toggle>
                        </Card>
                    </Accordion>
                    {/* <button
                      className="btn btn-light btn-sm w-100 my-4"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default Filters;
