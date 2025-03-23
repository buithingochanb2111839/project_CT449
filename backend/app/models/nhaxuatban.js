const mongoose = require('mongoose');

const nxbSchema = new mongoose.Schema({
  TenNXB: { 
    type: String, 
    required: true 
    },

  DiaChi: { 
    type: String, 
    required: true 
    },
    
  //bo sung them sdt so voi db mau
  DienThoai: { 
    type: String 
    }
});

module.exports = mongoose.model('NhaXuatBan', nxbSchema);
