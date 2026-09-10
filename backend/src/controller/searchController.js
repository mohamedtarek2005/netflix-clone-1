const searchService = require('../service/searchService');
const { success, failure } = require('../utils/apiResponse');

async function search(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return failure(res, 'Query parameter "q" is required', 400);
    }

    const results = await searchService.search(q.trim());
    return success(res, results);
  } catch (err) {
    next(err);
  }
}

module.exports = { search };
