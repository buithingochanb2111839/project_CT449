const mongoose = require('mongoose');

const nhanVienSchema = new mongoose.Schema({
  HoTenNV: { 
    type: String, 
    required: true 
    }, 

  Password: { 
    type: String, 
    required: true 
    }, 

  ChucVu: {
    type: String, 
    required: true 
    }, 
    
  DiaChi: { 
    type: String, 
    required: true 
    }, 
    
  SoDienThoai: { 
    type: String, 
    required: true, 
    unique: true 
    }, 

  role: { 
    type: Number, 
    default: 0, // 0 là nhân viên, 1 là admin
    enum: [0, 1]
  }
});

module.exports = mongoose.model('NhanVien', nhanVienSchema);
