const Department = require("../models/Department");

exports.getDepartments = async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
};

exports.addDepartment = async (req, res) => {
    try {
        const department = await Department.create({
            name: req.body.name,
            description: req.body.description
        });
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!department) return res.status(404).json({ message: "Department not found" });
        res.json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
};