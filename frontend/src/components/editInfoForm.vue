<template>
  <form @submit.prevent="updateInfo">
    <h2 class="mb-4">{{ isNhanVien ? 'Chỉnh Sửa Nhân Viên' : 'Chỉnh Sửa Đọc Giả' }}</h2>

    <!-- nhan vienvien -->
    <div v-if="isNhanVien" class="form-group">
      <label>Họ Tên</label>
      <input type="text" v-model="formData.HoTenNV" class="form-control" required />
    </div>

    <!-- doc gia -->
    <template v-else>
      <div class="form-group">
        <label>Họ</label>
        <input type="text" v-model="formData.HoLot" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Tên</label>
        <input type="text" v-model="formData.Ten" class="form-control" required />
      </div>
    </template>

    <div class="form-group">
      <label>Ngày Sinh</label>
      <input type="date" v-model="formData.NgaySinh" class="form-control" required />
    </div>

    <div v-if="isNhanVien" class="form-group">
      <label>Chức Vụ</label>
      <input type="text" v-model="formData.ChucVu" class="form-control" required />
    </div>

    <div class="form-group">
      <label>Địa Chỉ</label>
      <input type="text" v-model="formData.DiaChi" class="form-control" required />
    </div>

    <div class="form-group">
      <label>Điện Thoại</label>
      <input type="text" v-model="phoneField" class="form-control" required />
    </div>

    <div v-if="!isNhanVien" class="form-group">
      <label>Email</label>
      <input type="email" v-model="formData.Email" class="form-control" required />
    </div>

    <div class="form-group">
      <label>Mật Khẩu Cũ</label>
      <input type="password" v-model="currentPassword" class="form-control" required />
    </div>

    <div class="form-group">
      <label>Mật Khẩu Mới</label>
      <input type="password" v-model="newPassword" class="form-control" />
    </div>

    <div class="form-group">
      <label>Nhập Lại Mật Khẩu Mới</label>
      <input type="password" v-model="confirmNewPassword" class="form-control" />
    </div>

    <div class="text-center mt-3">
      <button type="submit" class="btn btn-success">Cập Nhật</button>
      <button v-if="!isNhanVien" @click.prevent="confirmDeleteAccount" class="btn btn-danger ms-2">Xóa Tài Khoản</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import TheoDoiService from "@/services/theodoimuonsach.service"; //lay phieu muon cua doc gia
import DocGiaService from "@/services/docgia.service";

export default {
  props: {
    userRole: String,
    userData: Object,
    userId: String,
  },
  data() {
    return {
      formData: { ...this.userData },
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  computed: {
    isNhanVien() {
      return this.userRole === "nhanvien";
    },
    phoneField: {
      get() {
        return this.isNhanVien ? this.formData.SoDienThoai : this.formData.DienThoai;
      },
      set(value) {
        if (this.isNhanVien) this.formData.SoDienThoai = value;
        else this.formData.DienThoai = value;
      },
    },
  },
  methods: {
    async updateInfo() {
      const url = `http://localhost:3000/api/${this.userRole}/${this.userId}`;
      const payload = {
        ...this.formData,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      };

      try {
        const res = await axios.put(url, payload);
        alert(res.data.message || "Cập nhật thành công!");
        this.$router.push("/");
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi cập nhật!");
      }
    },
    async confirmDeleteAccount() {
      try {
        const list = await TheoDoiService.getByDocGia(this.userId); 
        if (list.length > 0) {
          alert("Không thể xóa vì có phiếu mượn.");
        } else if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
        await DocGiaService.deleteById(this.userId);
        alert("Đã xóa thành công!");
        this.$router.push("/");
        }
      } catch (err) {
        alert("Lỗi khi kiểm tra hoặc xóa tài khoản!");
      }
    },
  },
};
</script>
