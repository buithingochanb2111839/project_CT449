const Sach = require('../models/sach');
//CRUD

//tao sach moi
exports.createSach = async (data) => {
  try {
    const newSach = new Sach({
      ...data,
      ImagePath: data.ImagePath || '',
    });
    return await newSach.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo sách: ${error.message}`);
  }
};

//lay tat ca sach de hien thi
exports.getAllSach = async () => {
  try {
    return await Sach.find().populate('MaNXB'); //lay toan bo thong tin nxb
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách sách: ${error.message}`);
  }
};

// lay sach theo id
exports.getSachById = async (id) => {
  try {
    return await Sach.findById(id).populate('MaNXB');
  } catch (error) {
    throw new Error(`Lỗi khi lấy sách: ${error.message}`);
  }
};

//cap nhat
exports.updateSach = async (id, data) => {
  try {
    return await Sach.findByIdAndUpdate(
      id,
      data,
      { new: true }
    ).populate('MaNXB');
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật sách: ${error.message}`);
  }
};

//xoa
exports.deleteSach = async (id) => {
  try {
    return await Sach.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Lỗi khi xóa sách: ${error.message}`);
  }
};