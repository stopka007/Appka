const Ajv = require("ajv");
const ajv = new Ajv();

const BookmarkDao = require("../../dao/Bookmark-dao.js");

const Bookmarkschema = {
  type: "object",
  properties: {
    name: { type: "string" },
    data: { type: "string"}
  },
  required: ["name", "data"],
};

async function CreateBookmark(req, res) {
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

    Bookmark = BookmarkDao.create(Bookmark);
    res.json(Bookmark);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateBookmark;