import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  // state is state in filter_reducer
  // console.log(state);
  if (action.type === LOAD_PRODUCTS) {
    // console.log(action);
    const prices = action.payload.map((p) => p.price);
    // destructering [maxPrice] to integers
    // console.log(...maxPrice);
    //
    let maxPrice = Math.max(...prices);
    // console.log(maxPrice);
    return {
      ...state,
      // why do we return all_product, filtered_products, and filters
      // what is action.payload
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    console.log(action.payload);
    return { ...state, sort: action.payload };
  }

  if (action.type == SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      // console.log("price-lowest");
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      // console.log("price-highest");
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      // console.log("name-a");
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      // console.log("name-z");
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];
    //filtering
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // category
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }

    // company
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }

    // color
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        // console.log(color);
        // console.log(product.colors);
        return product.colors.find((c) => c === color);
      });
    }

    // price
    if (price) {
      tempProducts = tempProducts.filter((product) => {
        return product.price <= price;
      });
    }

    // price
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === shipping;
      });
    }

    return { ...state, filtered_products: tempProducts };
    // return { ...state };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
