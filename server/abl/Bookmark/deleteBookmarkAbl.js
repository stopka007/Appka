const Ajv = require("ajv");
const ajv = new Ajv();
const BookmarkDao = require("../../dao/Bookmark-dao.js");

const Bookmarkschema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

async function DeleteBookmark(req, res) {
  try {
   
    const reqParams = req.body;
   
    const valid = ajv.validate(Bookmarkschema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    BookmarkDao.remove(reqParams.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteBookmark;