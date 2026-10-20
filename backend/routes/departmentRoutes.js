const express = require("express");
const router = express.Router();
const department = require("../controllers/departmentController");
const { authHandler, allowRoles } = require("../middleware/authHandler");

router.use(authHandler);
router.get("/", department.getDepartments);
router.post("/", allowRoles("admin"), department.addDepartment);
router.put("/:id", allowRoles("admin"), department.updateDepartment);
router.delete("/:id", allowRoles("admin"), department.deleteDepartment);

module.exports = router;