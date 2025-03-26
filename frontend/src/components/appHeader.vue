<template>
  <nav class="navbar py-3 navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <strong>Website Quản Lý Mượn Sách</strong>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto align-items-center">
          <li class="nav-item" v-if="userRole === 'docgia'">
            <router-link :to="{ name: 'theodoi' }" class="nav-link mr-4">Sách Đã Mượn</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'theodoi' }" class="nav-link mr-4">Phiếu Mượn</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'alldocgia' }" class="nav-link mr-4">Độc Giả</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien' && Pro">
            <router-link :to="{ name: 'nhanvien' }" class="nav-link mr-4">Nhân Viên</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'nhaxuatban' }" class="nav-link">Nhà Xuất Bản</router-link>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center">
          <li class="nav-item text-white" v-if="username">
            <router-link
              v-if="userRole === 'docgia'"
              :to="{ name: 'editdocgia', params: { id: userId } }"
              class="nav-link">
              Hi! {{ username }}
            </router-link>
            <span v-else class="nav-link">Hi! {{ username }}</span>
          </li>
          <li class="nav-item" v-if="username">
            <button @click="logout" class="btn btn-primary btn-sm ms-2">Đăng Xuất</button>
          </li>
          <li class="nav-item" v-else>
            <router-link :to="{ name: 'login' }" class="nav-link">Đăng Nhập | Đăng Ký</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: "AppHeader",
  props: {
    username: String,
    userId: String,
    userRole: String,
  },
  data() {
    return {
      Pro: false,
    };
  },
  async mounted() {
    await this.checkProRole();
  },
  watch: {
    userRole() {
      this.checkProRole(); 
    },
    userId() {
      this.checkProRole(); 
    }
  },
  methods: {
    logout() {
      this.$emit('logout'); 
    },
    async checkProRole() {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`/api/nhanvien/${userId}`);
          this.Pro = response.data.__v === 1;
        } else {
          this.Pro = false;
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền quản lý:", error);
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #000 !important;
  color: #fff !important;
}

.nav-link {
  color: #fff !important;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
}

.nav-link:hover {
  background-color: #fff !important;
  color: #000 !important;
}

.navbar-collapse {
  max-height: 400px;
  overflow-y: auto;
}
</style>
