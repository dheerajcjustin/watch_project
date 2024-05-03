router.get("/brands",adminController.adminBrandPage);
router.post("/brands",upload.single('logo'),adminController.adminBrandAddPost);