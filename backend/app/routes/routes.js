const express = require('express');
const router = express.Router();

const docgiaRoute = require('./docGia.route'); 
const sachRoute = require('./sach.route'); 
const nhaXuatBanRoute = require('./nhaXuatBan.route'); 
const theoDoiMuonSachRoute = require('./theoDoiMuonSach.route'); 
const nhanVienRoute = require('./nhanVien.route'); 

router.use('/docgia', docgiaRoute);
router.use('/sach', sachRoute);
router.use('/nxb', nhaXuatBanRoute);
router.use('/theodoi', theoDoiMuonSachRoute);
router.use('/nhanvien', nhanVienRoute);

module.exports = router;