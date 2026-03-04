// API Routes
const express = require('express');
const roleService = require('./roleService');
const userService = require('./userService');

const router = express.Router();

// ==================== ROLE ROUTES ====================

// GET: Lấy tất cả vai trò
router.get('/api/roles', roleService.getAllRoles);

// GET: Lấy vai trò theo ID
router.get('/api/roles/:id', roleService.getRoleById);

// GET: Lấy tất cả người dùng trong vai trò
router.get('/api/roles/:id/users', roleService.getRoleUsers);

// POST: Tạo vai trò mới
router.post('/api/roles', roleService.createRole);

// PUT: Cập nhật vai trò
router.put('/api/roles/:id', roleService.updateRole);

// DELETE: Xóa vai trò
router.delete('/api/roles/:id', roleService.deleteRole);

// ==================== USER ROUTES ====================

// GET: Lấy tất cả người dùng
router.get('/api/users', userService.getAllUsers);

// GET: Lấy người dùng theo username
router.get('/api/users/:username', userService.getUserByUsername);

// POST: Tạo người dùng mới
router.post('/api/users', userService.createUser);

// PUT: Cập nhật người dùng
router.put('/api/users/:username', userService.updateUser);

// PATCH: Tăng login count
router.patch('/api/users/:username/login-count', userService.increaseLoginCount);

// DELETE: Xóa người dùng
router.delete('/api/users/:username', userService.deleteUser);

module.exports = router;
