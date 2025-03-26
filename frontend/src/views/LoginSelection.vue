<template>
  <div class="login-selection container mt-5 text-center">
    <div class="d-flex justify-content-center align-items-center gap-2">
      <h2 class="mb-0">Xin lỗi, bạn là:</h2>
      <select v-model="selectedRole" class="form-select form-control w-auto ml-3" style="height: 40px;">
        <option disabled value="">-- Chọn vai trò --</option>
        <option value="docgia">Đọc Giả</option>
        <option value="nhanvien">Nhân Viên</option>
      </select>
    </div>

    <div v-if="selectedRole" class="mt-4">
      <LoginForm :role="selectedRole" @loginSuccess="handleLoginSuccess" />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue"; 

export default {
  data() {
    return {
      selectedRole: null, 
    };
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role; 
    },
    handleLoginSuccess(username, userId, role) {
      
      this.$emit("loginSuccess", username, userId, role);
    },
  },
  components: {
    LoginForm,
  },
};
</script>
<style>
  
</style>