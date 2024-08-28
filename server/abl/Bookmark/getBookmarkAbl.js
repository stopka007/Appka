const Ajv = require("ajv");
const ajv = new Ajv();
const BookmarkDao = require("../../dao/Bookmark-dao.js");

const Bookmarkschema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetBookmark(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

   
    const valid = ajv.validate(Bookmarkschema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    
    const Bookmark = BookmarkDao.get(reqParams.id);
    if (!Bookmark) {
      res.status(404).json({
        code: "BookmarkNotFound",
        message: `Bookmark ${reqParams.id} not found`,
      });
      return;
    }


    res.json(Bookmark);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetBookmark;