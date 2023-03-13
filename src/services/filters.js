export const applyFilters = (state, productList) => {
    // If there is a search filter, remove all the products not matching the search
    if (state.search?.length > 0) {
        for (let i = 0; i < productList.length; i++) {
            if (!searchMatchFunction(state.search, productList[i])) {
                productList.splice(i, 1);
                i--;
            }
        }
    }

    // If a minimum price is set, remove all products below it
    if (state.minPrice !== null) {
        for (let i = 0; i < productList.length; i++) {
            if (parseFloat(productList[i].price) < state.minPrice) {
                productList.splice(i, 1);
                i--;
            }
        }
    }

    // If a maximum price is set, remove all products above it
    if (state.maxPrice !== null) {
        for (let i = 0; i < productList.length; i++) {
            if (parseFloat(productList[i].price) > state.maxPrice) {
                productList.splice(i, 1);
                i--;
            }
        }
    }

    // If there are category filters enabled, apply them to the product list
    if (state.categories.length > 0) {
        // Loops through every product in the list
        for (let i = 0; i < productList.length; i++) {
            // Checks if any of the product categories are included in the filters
            if (
                !productList[i].categories.some(
                    (category) => state.categories.indexOf(category.name) >= 0
                )
            ) {
                // If not, remove the product from the array
                productList.splice(i, 1);
                i--;
            }
        }
    }

    // If there are condition filters enabled, apply them to the product list
    if (state.conditions.length > 0) {
        for (let i = 0; i < productList.length; i++) {
            var product = productList[i];

            // Creates an array of conditions from the product attributes
            var conditions = [];
            if (product.attributes) {
                for (let index in product.attributes) {
                    if (product.attributes[index].name === "Condition") {
                        conditions = conditions.concat(
                            product.attributes[index].options
                        );
                    }
                }
            }

            // If none of the product conditions match an active filter, remove the product from the list
            if (
                !state.conditions.some(
                    (condition) =>
                        conditions.indexOf(condition.toLowerCase()) >= 0
                )
            ) {
                productList.splice(i, 1);
                i--;
            }
        }
    }

    // If there are size filters enabled, apply them to the product list
    if (state.sizes.length > 0) {
        for (let i = 0; i < productList.length; i++) {
            var product = productList[i];

            // Creates an array of sizes from the product attributes
            var sizes = [];
            if (product.attributes) {
                for (let index in product.attributes) {
                    if (product.attributes[index].name === "Size") {
                        sizes = sizes.concat(product.attributes[index].options);
                    }
                }
            }

            // If none of the product sizes match an active filter, remove the product from the list
            if (
                !state.sizes.some(
                    (size) => sizes.indexOf(size.toLowerCase()) >= 0
                )
            ) {
                productList.splice(i, 1);
                i--;
            }
        }
    }

    // If there are colour filters enabled, apply them to the product list
    if (state.colours.length > 0) {
        for (let i = 0; i < productList.length; i++) {
            var product = productList[i];

            // Creates an array of colours from the product attributes
            var colours = [];
            if (product.attributes) {
                for (let index in product.attributes) {
                    if (product.attributes[index].name === "Colour") {
                        colours = colours.concat(
                            product.attributes[index].options
                        );
                    }
                }
            }

            // If none of the product colours match an active filter, remove the product from the list
            if (
                !state.colours.some(
                    (colour) => colours.indexOf(colour.toLowerCase()) >= 0
                )
            ) {
                productList.splice(i, 1);
                i--;
            }
        }
    }

    productList = applySort(state.sort, productList);

    // Creates a new list for the sold products
    var soldList = [];
    for (let i = 0; i < productList.length; i++) {
        let product = productList[i];

        // If the product is out of stock, add it to the sold list and remove it from the unsold list
        if (product.manage_stock && !product.stock_quantity) {
            soldList.push(product);
            productList.splice(i, 1);
            i--;
        }
    }

    return { unsold: productList, sold: soldList };
};

export const applySort = (sort, productList) => {
    if (sort === "recent") {
        productList.sort(mostRecentFunction);
    } else if (sort === "popular") {
        productList.sort(mostPopularFunction);
    } else if (sort === "priceasc") {
        productList.sort(priceAscendingFunction);
    } else if (sort === "pricedesc") {
        productList.sort(priceDescendingFunction);
    }

    return productList;
};

function searchMatchFunction(search, product) {
    var searchItems = search.split(" ");
    var searchRange = product.name;
    for (let i in product.categories) {
        searchRange += " " + product.categories[i].name;
    }

    var matchesNeeded = 0;
    if (searchItems.length > 3) {
        matchesNeeded = 3;
    } else if (searchItems.length == 3) {
        matchesNeeded = 2;
    } else {
        matchesNeeded = searchItems.length;
    }

    for (var item in searchItems) {
        if (
            searchRange.toLowerCase().includes(searchItems[item].toLowerCase())
        ) {
            matchesNeeded--;
        }
    }

    return matchesNeeded > 0 ? false : true;
}

function mostRecentFunction(a, b) {
    a = new Date(a.date_created);
    b = new Date(b.date_created);

    return b - a;
}

export function mostPopularFunction(a, b) {
    a = a.meta_data.find((meta) => meta.key === "_wcfm_product_views");
    if (!a || a === undefined) {
        a = 0;
    } else {
        a = parseInt(a.value) || 0;
    }

    b = b.meta_data.find((meta) => meta.key === "_wcfm_product_views");
    if (!b || b === undefined) {
        b = 0;
    } else {
        b = parseInt(b.value) || 0;
    }

    return b - a;
}

function priceAscendingFunction(a, b) {
    a = a.price;
    if (!a || a === undefined) {
        a = 0;
    } else {
        a = parseFloat(a);
    }

    b = b.price;
    if (!b || b === undefined) {
        b = 0;
    } else {
        b = parseFloat(b);
    }

    if (a === b) {
        return 0;
    } else {
        return a < b ? -1 : 1;
    }
}

function priceDescendingFunction(a, b) {
    a = a.price;
    if (!a || a === undefined) {
        a = 0;
    } else {
        a = parseFloat(a);
    }

    b = b.price;
    if (!b || b === undefined) {
        b = 0;
    } else {
        b = parseFloat(b);
    }

    if (a === b) {
        return 0;
    } else {
        return a > b ? -1 : 1;
    }
}
