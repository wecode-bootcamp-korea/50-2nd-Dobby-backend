const appDataSource = require("./dataSource");

const getProductsByCategory = async (
  categoryId,
  orderingQuery,
  searchQuery
) => {
  const result = await appDataSource.query(
    `
  select p.id as id, p.name as name, p.price as price, p.image as image, avg(c.score) as score , count(c.id) as commentCount from products p join comments c on p.id = c.products_id where p.category_id = ? ${searchQuery} group by id , image , name , price ${orderingQuery} 
  `,
    [categoryId]
  );

  return result;
};

module.exports = {
  getProductsByCategory,
};
