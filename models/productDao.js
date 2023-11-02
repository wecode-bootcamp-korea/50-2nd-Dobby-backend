const appDataSource = require("./dataSource");

const getProducts = async (categoryQuery, searchQuery, orderingQuery) => {
  const result = await appDataSource.query(`
    SELECT
      p.id,
      p.image,
      p.name,
      p.price,
      AVG(c.score) AS score,
      COUNT(c.id) AS commentCount 
    FROM products p 
    JOIN comments c 
    ON p.id = c.products_id
    WHERE 1
    ${categoryQuery}
    ${searchQuery}
    GROUP BY p.id , p.image , p.name , p.price
    ${orderingQuery}`);
  return result;
};

const findProduct = async (productId) => {
  const product = await appDataSource.query(`
  SELECT 
    p.id, 
    p.name, 
    p.price, 
    p.image, 
    p.content, 
  IFNULL(ROUND(AVG(c.score), 1),0) as average_score
  FROM products p
  LEFT JOIN comments c ON p.id = c.products_id
  WHERE p.id = ${productId}
  GROUP BY p.id
  `);
  return product;
};

const commonQuery = `
    SELECT 
      p.id, p.name, p.price, p.image, p.content,
      COALESCE(AVG(c.score), 0) AS score, 
      COALESCE(COUNT(c.id), 0) AS commentCount
    FROM products p
    LEFT JOIN comments c ON p.id = c.products_id
`;

const getNewProducts = async () => {
  const query = `
    ${commonQuery}
    GROUP BY p.id
    ORDER BY p.created_at DESC 
    LIMIT 10
  `;
  return await appDataSource.query(query);
};

const getBestProducts = async () => {
  const query = `
    ${commonQuery}
    GROUP BY p.id
    ORDER BY p.sales DESC 
    LIMIT 10
  `;
  return await appDataSource.query(query);
};

const getMDRecommendations = async () => {
  const query = `
    ${commonQuery}
    WHERE p.id IN (9, 10, 14, 15, 17, 18, 19)
    GROUP BY p.id
  `;
  return await appDataSource.query(query);
};

module.exports = {
  getNewProducts,
  getBestProducts,
  getMDRecommendations,
  findProduct,
  getProducts,
};
