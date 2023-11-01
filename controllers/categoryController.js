const categoryService = require("../services/categoryService");

const categoryInfo = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let { sortBy, search } = req.query;

    if (!categoryId) {
      res.status(400).json({ message: "KEY ERROR" });
    }

    const getProductsByCategory = await categoryService.categoryService(
      categoryId,
      sortBy,
      search
    );
    res.status(200).json({ message: getProductsByCategory });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  categoryInfo,
};
