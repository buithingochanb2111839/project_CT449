<template>
  <div class="login">
    <h3>Đăng Nhập {{ roleName }}</h3>
    <form @submit.prevent="handleLogin" class="mt-3">
      <div class="mb-3">
        <label for="username" class="form-label">Tài Khoản:</label>
        <input type="text" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật Khẩu:</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
    </form>

    <p v-if="role === 'docgia'" class="mt-3">
      Bạn chưa có tài khoản? <router-link to="/register">Đăng ký ngay!</router-link>
    </p>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import NhanVienService from "@/services/nhanvien.service";

export default {
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    roleName() {
      return this.role === "docgia" ? "Đọc Giả" : "Nhân Viên";
    },
  },
  methods: {
    async handleLogin() {
      try {
        let response;

        if (this.role === "docgia") {
          response = await DocGiaService.login(this.username, this.password);
        } else if (this.role === "nhanvien") {
          response = await NhanVienService.login(this.username, this.password);
        }

        const userName = this.role === "docgia"
          ? response.docgia?.Ten
          : response.nhanVien?.HoTenNV;

        const userId = this.role === "docgia"
          ? response.docgia?._id
          : response.nhanVien?._id;

        if (userName && userId) {
          this.$emit("loginSuccess", userName, userId, this.role);
          this.$router.push('/');
        } else {
          console.error("Không có dữ liệu người dùng trong phản hồi");
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        alert("Tài khoản hoặc mật khẩu không chính xác");
      }
    }
  }
};
</script>

<style scoped>
</style>
