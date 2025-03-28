const express = require('express');
const router = express.Router();
const nhanvienController = require('../controllers/nhanVien.controller');

router.post('/', nhanvienController.createNhanVien);
router.get('/', nhanvienController.getAllNhanVien);
router.post('/login', nhanvienController.loginNhanVien);
router.get('/:id', nhanvienController.getNhanVienById);
router.put('/:id', nhanvienController.updateNhanVien);
router.delete('/:id', nhanvienController.deleteNhanVien);

module.exports = router;