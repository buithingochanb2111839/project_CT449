const NhanVien = require('../models/nhanvien');
const bcrypt = require('bcryptjs');

exports.loginNhanVien = async (soDienThoai, password) => {
  try {
    const nhanVien = await NhanVien.findOne({ SoDienThoai: soDienThoai });
    if (!nhanVien) {
      throw new Error('Lỗi! Nhân viên không tồn tại');
    }
    
    const isMatch = await bcrypt.compare(password, nhanVien.Password);
    if (!isMatch) {
      throw new Error('Mật khẩu không chính xác');
    }

    return {
      username: nhanVien.HoTenNV,
      nhanVien: {
        _id: nhanVien._id, 
        HoTenNV: nhanVien.HoTenNV,
      },
    };
  } catch (error) {
    throw new Error(`Lỗi khi đăng nhập nhân viên: ${error.message}`);
  }
};

exports.createNhanVien = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.Password, salt); 
    const newNhanVien = new NhanVien({
      ...data, 
      Password: hashedPassword, 
    });

    return await newNhanVien.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo nhân viên: ${error.message}`);
  }
};

exports.getAllNhanVien = async () => {
  try {
    return await NhanVien.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách nhân viên: ${error.message}`);
  }
};

exports.getNhanVienById = async (id) => {
  try {
    return await NhanVien.findById(id); 
  } catch (error) {
    throw new Error(`Lỗi khi lấy nhân viên: ${error.message}`);
  }
};

exports.updateNhanVien = async (id, data) => {
  return await NhanVien.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteNhanVien = async (id) => {
  try {
    return await NhanVien.findByIdAndDelete(id); 
  } catch (error) {
    throw new Error(`Lỗi khi xóa nhân viên: ${error.message}`);
  }
};