const categoryService = require("../services/categoryService");

const categoryInfo = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let { sortBy, search } = req.query;

    if (!categoryId) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const getProductsByCategory = await categoryService.fetchProductsByCategory(
      categoryId,
      sortBy,
      search
    );
    res.status(200).json({ message: getProductsByCategory });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  categoryInfo,
};
