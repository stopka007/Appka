const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const BookmarkFolderPath = path.join(__dirname, "BookmarkList");

function create(Bookmark) {
  try {
    Bookmark.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(BookmarkFolderPath, `${Bookmark.id}.json`);
    const fileData = JSON.stringify(Bookmark);
    fs.writeFileSync(filePath, fileData, "utf8");
    return Bookmark;
  } catch (error) {
    throw { code: "failedToCreateBookmark", message: error.message };
  }
}

function get(BookmarkId) {
  try {
    const filePath = path.join(BookmarkFolderPath, `${BookmarkId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadBookmark", message: error.message };
  }
}
function update(Bookmark) {
  try {
    const currentBookmark = get(Bookmark.id);
    if (!currentBookmark) return null;
    const newBookmark = { ...currentBookmark, ...Bookmark };
    const filePath = path.join(BookmarkFolderPath, `${Bookmark.id}.json`);
    const fileData = JSON.stringify(newBookmark);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newBookmark;
  } catch (error) {
    throw { code: "failedToUpdateBookmark", message: error.message };
  }
}

function remove(BookmarkId) {
  try {
    const filePath = path.join(BookmarkFolderPath, `${BookmarkId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveBookmark", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(BookmarkFolderPath);
    const BookmarkList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(BookmarkFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return BookmarkList;
  } catch (error) {
    throw { code: "failedToListBookmarks", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};