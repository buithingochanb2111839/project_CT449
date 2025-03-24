const DocGia = require('../models/docgia');
const bcrypt = require('bcryptjs'); //ma hoa mk
//CRUD

//dang ky
exports.registerDocGia = async (data) => {
  try {   
    //bat loi email
    const existingDocGia = await DocGia.findOne({ Email: data.Email });
    if (existingDocGia) {
      throw new Error('Email đã được sử dụng');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.Password, salt);
    
    const newDocGia = new DocGia({
      ...data,
      Password: hashedPassword,
    });
    return await newDocGia.save();
  } catch (error) {
    throw new Error(`Lỗi khi đăng ký đọc giả: ${error.message}`);
  }
};

//dang nhap
exports.loginDocGia = async (email, password) => {
  try {
    const docGia = await DocGia.findOne({ Email: email });
    if (!docGia) {
      throw new Error('Email không chính xác');
    }

    const isMatch = await bcrypt.compare(password, docGia.Password);
    if (!isMatch) {
      throw new Error('Sai mật khẩu');
    }

    return docGia;
  } catch (error) {
    throw new Error(`Lỗi khi đăng nhập đọc giả: ${error.message}`);
  }
};

//lay tat ca 
exports.getAllDocGia = async () => {
  try {
    return await DocGia.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách đọc giả: ${error.message}`);
  }
};

//lay theo id
exports.getDocGiaById = async (id) => {
  try {
    return await DocGia.findById(id); 
  } catch (error) {
    throw new Error(`Lỗi khi lấy đọc giả: ${error.message}`);
  }
};

//update
exports.updateDocGia = async (id, data) => {
  const { currentPassword, newPassword, ...updateData } = data;
  
  const docgia = await DocGia.findById(id);
  if (!docgia) throw new Error("Đọc giả không tồn tại");
    
  const isMatch = await bcrypt.compare(currentPassword, docgia.Password);
  if (!isMatch) throw new Error("Mật khẩu cũ không chính xác");

  Object.assign(docgia, updateData);
    
  if (newPassword) {
    docgia.Password = await bcrypt.hash(newPassword, 10);
  }

  await docgia.save();
  return docgia;
};

exports.deleteDocGia = async (id) => {
  try {
    return await DocGia.findByIdAndDelete(id); 
  } catch (error) {
    throw new Error(`Lỗi khi xóa đọc giả: ${error.message}`);
  }
};