// User Service - CRUD operations for users
const { dataUser, dataRole } = require('./data');

// CREATE: Thêm người dùng mới
const createUser = (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, status, role } = req.body;

    // Validate required fields
    if (!username || !password || !email) {
      return res.status(400).json({ 
        message: "Username, password, và email không được để trống" 
      });
    }

    // Check if username already exists
    if (dataUser.find(u => u.username === username)) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Check if email already exists
    if (dataUser.find(u => u.email === email)) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Get role info if roleId provided
    let userRole = role || { id: "r3", name: "Người dùng", description: "Tài khoản người dùng thông thường" };
    if (role && role.id) {
      const roleData = dataRole.find(r => r.id === role.id);
      if (roleData) {
        userRole = { id: roleData.id, name: roleData.name, description: roleData.description };
      }
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
      fullName: fullName || "",
      avatarUrl: avatarUrl || "",
      status: status !== undefined ? status : true,
      loginCount: 0,
      role: userRole,
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dataUser.push(newUser);
    res.status(201).json({ 
      message: "Tạo người dùng thành công", 
      data: newUser 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo người dùng", error: error.message });
  }
};

// READ: Lấy tất cả người dùng
const getAllUsers = (req, res) => {
  try {
    res.status(200).json({ 
      message: "Lấy danh sách người dùng thành công", 
      data: dataUser 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách người dùng", error: error.message });
  }
};

// READ: Lấy người dùng theo username
const getUserByUsername = (req, res) => {
  try {
    const { username } = req.params;
    const user = dataUser.find(u => u.username === username);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({ 
      message: "Lấy người dùng thành công", 
      data: user 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy người dùng", error: error.message });
  }
};

// UPDATE: Cập nhật thông tin người dùng
const updateUser = (req, res) => {
  try {
    const { username } = req.params;
    const { email, fullName, avatarUrl, status, password, role } = req.body;

    const userIndex = dataUser.findIndex(u => u.username === username);
    if (userIndex === -1) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Check if new email already exists (and belongs to a different user)
    if (email && email !== dataUser[userIndex].email) {
      if (dataUser.find(u => u.email === email)) {
        return res.status(400).json({ message: "Email đã được sử dụng bởi người dùng khác" });
      }
      dataUser[userIndex].email = email;
    }

    if (fullName) dataUser[userIndex].fullName = fullName;
    if (avatarUrl) dataUser[userIndex].avatarUrl = avatarUrl;
    if (status !== undefined) dataUser[userIndex].status = status;
    if (password) dataUser[userIndex].password = password;

    if (role && role.id) {
      const roleData = dataRole.find(r => r.id === role.id);
      if (roleData) {
        dataUser[userIndex].role = { 
          id: roleData.id, 
          name: roleData.name, 
          description: roleData.description 
        };
      }
    }

    dataUser[userIndex].updatedAt = new Date().toISOString();

    res.status(200).json({ 
      message: "Cập nhật người dùng thành công", 
      data: dataUser[userIndex] 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật người dùng", error: error.message });
  }
};

// UPDATE: Tăng login count
const increaseLoginCount = (req, res) => {
  try {
    const { username } = req.params;
    const userIndex = dataUser.findIndex(u => u.username === username);

    if (userIndex === -1) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    dataUser[userIndex].loginCount += 1;
    dataUser[userIndex].updatedAt = new Date().toISOString();

    res.status(200).json({ 
      message: "Tăng login count thành công", 
      data: dataUser[userIndex] 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tăng login count", error: error.message });
  }
};

// DELETE: Xóa người dùng
const deleteUser = (req, res) => {
  try {
    const { username } = req.params;
    const userIndex = dataUser.findIndex(u => u.username === username);

    if (userIndex === -1) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const deletedUser = dataUser.splice(userIndex, 1);
    res.status(200).json({ 
      message: "Xóa người dùng thành công", 
      data: deletedUser[0] 
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa người dùng", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  updateUser,
  increaseLoginCount,
  deleteUser
};
