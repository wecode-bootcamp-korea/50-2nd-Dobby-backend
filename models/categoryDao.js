const appDataSource = require("./dataSource");

const getProductsByCategory = async (
  categoryId,
  orderingQuery,
  searchQuery
) => {
  const result = await appDataSource.query(
    `
  SELECT p.id AS id, p.name AS name, p.price AS price, p.image AS image, AVG(c.score) AS score , count(c.id) AS commentCount
  FROM products p 
  JOIN comments c 
  ON p.id = c.products_id 
  WHERE p.category_id = ? ${searchQuery} 
  GROUP BY id , image , name , price ${orderingQuery} 
  `,
    [categoryId]
  );

  return result;
};

module.exports = {
  getProductsByCategory,
};
