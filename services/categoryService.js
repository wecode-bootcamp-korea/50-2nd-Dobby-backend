const categoryDao = require("../models/categoryDao");

const categoryService = async (
  categoryId,
  sortBy,
  search
) => {
  const ordering = async (sortBy) => {
    const sortOptions = {
      priceAsc: "order by p.price asc , p.id asc",
      priceDesc: "order by p.price desc , p.id asc",
      nameAsc: "order by p.name asc , p.id asc",
      newest: "order by p.created_at desc , p.id asc",
      default: "order by p.id",
    };
    return sortOptions[sortBy] || sortOptions.default;
  };

  const orderingQuery = await ordering(sortBy);

  const searchQuery = search
    ? `and (p.name like '%${search}%' or p.content like '%${search}%')`
    : "";

  return await categoryDao.getProductsByCategory(
    categoryId,
    orderingQuery,
    searchQuery
  );
};

module.exports = {
  categoryService,
};
