const categoryDao = require("../models/categoryDao");

const fetchProductsByCategory = async (
  categoryId,
  sortBy,
  search
) => {
  const ordering = async (sortBy) => {
    const sortOptions = {
      priceAsc: "ORDER BY p.price ASC , p.id ASC",
      priceDesc: "ORDER BY p.price DESC , p.id ASC",
      nameAsc: "ORDER BY p.name ASC , p.id ASC",
      newest: "ORDER BY p.created_at DESC , p.id ASC",
      default: "ORDER BY p.id",
    };
    return sortOptions[sortBy] || sortOptions.default;
  };

  const orderingQuery = await ordering(sortBy);

  const searchQuery = search
    ? `AND (p.name like '%${search}%' OR p.content like '%${search}%')`
    : "";

  return await categoryDao.getProductsByCategory(
    categoryId,
    orderingQuery,
    searchQuery
  );
};

module.exports = {
  fetchProductsByCategory,
};
