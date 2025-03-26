<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Chỉnh Sửa Thông Tin Nhân Viên</h2>
    <form @submit.prevent="updateNhanVien">
      <div class="mb-3">
        <label for="HoTenNV" class="form-label">Họ Tên</label>
        <input type="text" id="HoTenNV" v-model="nhanvien.HoTenNV" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="NgaySinh" class="form-label">Ngày Sinh</label>
        <input type="date" id="NgaySinh" v-model="nhanvien.NgaySinh" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="ChucVu" class="form-label">Chức Vụ</label>
        <input type="text" id="ChucVu" v-model="nhanvien.ChucVu" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="DiaChi" class="form-label">Địa Chỉ</label>
        <input type="text" id="DiaChi" v-model="nhanvien.DiaChi" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="SoDienThoai" class="form-label">Số Điện Thoại</label>
        <input type="text" id="SoDienThoai" v-model="nhanvien.SoDienThoai" class="form-control" required />
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-success">Cập Nhật</button>
        <router-link to="/nhanvien" class="btn btn-secondary ml-2">Hủy</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nhanvien: {
        HoTenNV: "",
        NgaySinh: "",
        ChucVu: "",
        DiaChi: "",
        SoDienThoai: "",
      },
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axios.get(`/api/nhanvien/${id}`);
      this.nhanvien = response.data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
    }
  },
  methods: {
    async updateNhanVien() {
      try {
        await axios.put(`/api/nhanvien/${this.$route.params.id}`, this.nhanvien);
        alert("Cập nhật thành công!");
        this.$router.push("/nhanvien");
      } catch (error) {
        alert("Cập nhật thất bại!");
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Style đơn giản */
</style>
