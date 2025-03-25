<template>
  <div class="row">
    <div class="col-md-3 mb-3">
      <router-link to="/docgia" class="btn btn-primary btn-block">Đọc Giả</router-link>
    </div>
    <div class="col-md-3 mb-3" v-if="isManager">
      <router-link to="/nhanvien" class="btn btn-primary btn-block">Nhân Viên</router-link>
    </div>
    <div class="col-md-3 mb-3">
      <router-link to="/nxb" class="btn btn-primary btn-block">Nhà Xuất Bản</router-link>
    </div>
    <div class="col-md-3 mb-3">
      <router-link to="/theodoi" class="btn btn-primary btn-block">Phiếu Mượn</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "linkManageForm",
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isManager: false,
    };
  },
  async mounted() {
    if (this.userId) {
      try {
        const { data } = await axios.get(`/api/nhanvien/${this.userId}`);
        this.isManager = data.role === 1;
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền quản lý:", error);
      }
    }
  },
};
</script>

<style scoped>
.btn-block {
  width: 100%;
}
</style>
