const express = require("express");
const router = express.Router();

const {
  createAuthor,
  loginAuthor,
} = require("../controllers/authorController");

const {
  Blogs,
  getBlogs,
  updating,
  deleting,
  specificDeleting,
} = require("../controllers/blogController");

const { mid1, mid2 } = require("../middleware/tokenMiddleware");

router.post("/Authors", createAuthor);
router.post("/login", loginAuthor);
//blog routes------>
router.post("/blogs", mid1, Blogs);
router.get("/getBlog", mid1, getBlogs);
router.put("/blogs/:blogId", mid2, updating);
router.delete("/blogs/:blogId", mid2, deleting);
router.delete("/blogs", mid1, specificDeleting);

module.exports = router;
