const Ajv = require("ajv");
const ajv = new Ajv();

const BookmarkDao = require("../../dao/Bookmark-dao.js");

const Bookmarkschema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    data: { type: "string" }
  },
  required: ["id", "name", "data"],
};

async function UpdateBookmark(req, res) {
  try {
    let Bookmark = req.body;

    
    const valid = ajv.validate(Bookmarkschema, Bookmark);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedBookmark = BookmarkDao.update(Bookmark);
    if (!updatedBookmark) {
      res.status(404).json({
        code: "BookmarkNotFound",
        message: `Bookmark ${Bookmark.id} not found`,
      });
      return;
    }

    res.json(updatedBookmark);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateBookmark;