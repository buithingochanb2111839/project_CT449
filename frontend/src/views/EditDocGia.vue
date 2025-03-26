<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Chỉnh Sửa Thông Tin Đọc Giả</h2>
    <form @submit.prevent="updateDocGia">
      <div class="mb-3">
        <label for="hoLot" class="form-label">Họ</label>
        <input v-model="docgia.HoLot" type="text" class="form-control" id="hoLot" required />
      </div>
      <div class="mb-3">
        <label for="ten" class="form-label">Tên</label>
        <input v-model="docgia.Ten" type="text" class="form-control" id="ten" required />
      </div>
      <div class="mb-3">
        <label for="ngaySinh" class="form-label">Ngày Sinh</label>
        <input v-model="docgia.NgaySinh" type="date" class="form-control" id="ngaySinh" required />
      </div>
      <div class="mb-3">
        <label for="diaChi" class="form-label">Địa Chỉ</label>
        <input v-model="docgia.DiaChi" type="text" class="form-control" id="diaChi" required />
      </div>
      <div class="mb-3">
        <label for="dienThoai" class="form-label">Điện Thoại</label>
        <input v-model="docgia.DienThoai" type="text" class="form-control" id="dienThoai" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="docgia.Email" type="email" class="form-control" id="email" required />
      </div>

      <!-- Mật khẩu -->
      <div class="mb-3">
        <label for="currentPassword" class="form-label">Mật khẩu cũ</label>
        <input v-model="currentPassword" type="password" class="form-control" id="currentPassword" placeholder="Nhập mật khẩu hiện tại" required />
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label">Mật khẩu mới (tùy chọn)</label>
        <input v-model="newPassword" type="password" class="form-control" id="newPassword" placeholder="Để trống nếu không muốn đổi" />
      </div>

      <div class="text-center mb-4">
        <button type="submit" class="btn btn-success mr-3">Cập Nhật</button>
        <router-link to="/" class="btn btn-secondary ms-2">Hủy</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docgia: {
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        DiaChi: "",
        DienThoai: "",
        Email: "",
      },
      currentPassword: "",
      newPassword: "",
    };
  },
  created() {
    this.fetchDocGia();
  },
  methods: {
    async fetchDocGia() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/docgia/${id}`);
        this.docgia = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đọc giả:", error);
        alert("Không thể lấy thông tin đọc giả.");
      }
    },
    async updateDocGia() {
      const id = this.$route.params.id;
      try {
        const payload = {
          ...this.docgia,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword || null,
        };
        const response = await axios.put(`/api/docgia/${id}`, payload);
        alert(response.data.message || "Cập nhật thành công!");
        this.$router.push("/");
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        alert(error.response?.data?.message || "Cập nhật thất bại.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
