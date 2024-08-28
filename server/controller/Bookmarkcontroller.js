const express = require("express");
const router = express.Router();
const CreateBookmark = require("../abl/Bookmark/createBookmarkAbl");
const GetBookmark = require("../abl/Bookmark/getBookmarkAbl");
const ListBookmark = require("../abl/Bookmark/listBookmarksAbl");
const UpdateBookmark = require("../abl/Bookmark/updateBookmarkAbl");
const DeleteBookmark = require("../abl/Bookmark/deleteBookmarkAbl");

router.get("/get", GetBookmark);
router.get("/", ListBookmark);
router.post("/create", CreateBookmark);
router.post("/update", UpdateBookmark);
router.post("/delete", DeleteBookmark);


module.exports = router; 