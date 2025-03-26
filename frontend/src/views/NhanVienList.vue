<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Quản Lý Nhân Viên</h1>
    <router-link :to="{name:'addnhanvien'}" class="btn btn-success mb-3">Thêm Nhân Viên</router-link>
    <table class="table table-striped table-bordered">
      <thead class="table table-bordered text-center">
        <tr>
          <th><strong>Họ Tên</strong></th>
          <th><strong>Chức Vụ</strong></th>
          <th><strong>Địa Chỉ</strong></th>
          <th><strong>Số Điện Thoại</strong></th>
          <th><strong>Tùy chọn</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanVien in nhanViens" :key="nhanVien._id">
          <td>{{ nhanVien.HoTenNV }}</td>
          <td>{{ nhanVien.ChucVu }}</td>
          <td>{{ nhanVien.DiaChi }}</td>
          <td>{{ nhanVien.SoDienThoai }}</td>
          <td>
            <router-link :to="`/nguoi/${nhanVien._id}`" class="btn btn-warning btn-sm me-2 mr-2">Sửa</router-link>
            <button @click="deleteNhanVien(nhanVien._id)" class="btn btn-danger btn-sm mr-2">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NhanVienList",
  data() {
    return {
      nhanViens: [],
    };
  },
  methods: {
    async fetchNhanViens() {
      try {
        const response = await axios.get('/api/nhanvien'); 
        this.nhanViens = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhân viên:', error);
      }
    },
    async deleteNhanVien(id) {
      if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
        try {
          await axios.delete(`/api/nhanvien/${id}`); 
          this.fetchNhanViens(); 
        } catch (error) {
          console.error('Lỗi khi xóa nhân viên:', error);
        }
      }
    },
  },
  created() {
    this.fetchNhanViens(); 
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
