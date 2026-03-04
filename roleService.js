// Role Service - CRUD operations for roles
const { dataRole } = require('./data');

// CREATE: Thêm vai trò mới
const createRole = (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Tên vai trò không được để trống" });
    }

    const newRole = {
      id: `r${dataRole.length + 1}`,
      name: name,
      description: description || "",
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dataRole.push(newRole);
    res.status(201).json({ 
      message: "Tạo vai trò thành công", 
      data: newRole 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo vai trò", error: error.message });
  }
};

// READ: Lấy tất cả vai trò
const getAllRoles = (req, res) => {
  try {
    res.status(200).json({ 
      message: "Lấy danh sách vai trò thành công", 
      data: dataRole 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách vai trò", error: error.message });
  }
};

// READ: Lấy vai trò theo ID
const getRoleById = (req, res) => {
  try {
    const { id } = req.params;
    const role = dataRole.find(r => r.id === id);

    if (!role) {
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    }

    res.status(200).json({ 
      message: "Lấy vai trò thành công", 
      data: role 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy vai trò", error: error.message });
  }
};

// UPDATE: Cập nhật vai trò
const updateRole = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const roleIndex = dataRole.findIndex(r => r.id === id);
    if (roleIndex === -1) {
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    }

    if (name) dataRole[roleIndex].name = name;
    if (description !== undefined) dataRole[roleIndex].description = description;
    dataRole[roleIndex].updatedAt = new Date().toISOString();

    res.status(200).json({ 
      message: "Cập nhật vai trò thành công", 
      data: dataRole[roleIndex] 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật vai trò", error: error.message });
  }
};

// DELETE: Xóa vai trò
const deleteRole = (req, res) => {
  try {
    const { id } = req.params;
    const roleIndex = dataRole.findIndex(r => r.id === id);

    if (roleIndex === -1) {
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    }

    const deletedRole = dataRole.splice(roleIndex, 1);
    res.status(200).json({ 
      message: "Xóa vai trò thành công", 
      data: deletedRole[0] 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa vai trò", error: error.message });
  }
};

// READ: Lấy tất cả người dùng trong vai trò
const getRoleUsers = (req, res) => {
  try {
    const { id } = req.params;
    const role = dataRole.find(r => r.id === id);

    if (!role) {
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    }

    const { dataUser } = require('./data');
    const usersInRole = dataUser.filter(u => u.role.id === id);

    res.status(200).json({ 
      message: "Lấy danh sách người dùng trong vai trò thành công", 
      roleInfo: role,
      data: usersInRole,
      count: usersInRole.length
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách người dùng", error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getRoleUsers
};
