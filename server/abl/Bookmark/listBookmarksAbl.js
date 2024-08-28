const BookmarkDao = require("../../dao/Bookmark-dao.js");

async function ListBookmark(req, res) {
  try {
    const BookmarkList = BookmarkDao.list();
    res.json(BookmarkList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListBookmark;