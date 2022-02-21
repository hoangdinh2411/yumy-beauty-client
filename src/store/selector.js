import { createSelector } from "@reduxjs/toolkit";

const servicesData = (state) => state.services;
const categoriesData = (state) => state.categories;
const couponsData = (state) => state.coupons;
const staffData = (state) => state.staffs;


const searchFilter = (state) => state.filter.search;
const categoryFilter = (state) => state.filter.category;
const priceFromFilter = (state) => state.filter.priceFrom;

const serviceRemainingSelector = createSelector(
  servicesData,
  staffData,
  searchFilter,
  categoryFilter,
  priceFromFilter,
  (services,staffs, searchText, category, priceFrom) => {
    const filteredServices = services?.filter((service) => {
      const text = new RegExp(searchText?.trim(), "i");
      const filteredStaffs = staffs.find(item=> item.fullName.match(text))
      if (category === "All") {
        return service?.name?.match(text)  || service?.staffs.includes(filteredStaffs?._id)
      }
      return service.name.match(text) && service.category === category;
    });

    switch (priceFrom) {
      case "Hight to Low":
        return filteredServices.sort((a, b) => b.price - a.price);
      case "Low to High":
        return filteredServices.sort((a, b) => a.price - b.price);
      default:
        return filteredServices;
    }
  }
);

const categoriesRemainingSelector = createSelector(
  categoriesData,
  searchFilter,
  categoryFilter,
  (categories, searchText, category) => {
    return categories.filter((item) => {
      const text = new RegExp(searchText?.trim(), "i");
      if (category === "All") {
        return item?.name?.match(text);
      }
      return item.name.match(text) && item._id === category;
    });
  }
);
const couponsRemainingSelector = createSelector(
  couponsData,
  searchFilter,
  categoryFilter,
  (coupons, searchText) => {
    return coupons.filter((item) => {
      const text = new RegExp(searchText?.trim(), "i");
      return item?.name?.match(text);
    });
  }
);

const staffsRemainingSelector = createSelector(
  staffData,
  searchFilter,
  categoryFilter,
  (staffs, searchText, category) => {
    return staffs?.filter((staff) => {
      const text = new RegExp(searchText?.trim(), "i");
      if (category === "All") {
        return staff?.fullName?.match(text) ||  staff?.phone?.match(text) ||  staff?.email?.match(text);
      }
      return ( staff?.fullName?.match(text) ||  staff?.phone?.match(text) ||  staff?.email?.match(text)) && staff?.categories.includes(category);
    });

  }
);

export {
  serviceRemainingSelector,
  categoriesRemainingSelector,
  couponsRemainingSelector,
  staffsRemainingSelector
};
