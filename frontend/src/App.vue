<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader 
      :username="username" 
      :userId="userId" 
      :userRole="userRole" 
      @logout="handleLogout" 
    />
    <router-view 
      class="flex-grow-1" 
      :is-logged-in="isLoggedIn" 
      @loginSuccess="updateLoginStatus" 
    />
    <AppFooter />
  </div>
</template>


<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/Footer.vue";
export default {
  components: {
    AppHeader,
    AppFooter, 
  },
  data() {
    return {
      isLoggedIn: false,
      username: '',
      userId: '',
    };
  },
  created() {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUsername && storedUserId && storedUserRole) { 
      this.isLoggedIn = true;
      this.username = storedUsername;
      this.userId = storedUserId;
      this.userRole = storedUserRole;
      console.log("User ID từ localStorage:", this.userId);
    }
  },
  methods: {
    updateLoginStatus(username, userId, userRole) {
      this.isLoggedIn = true;
      this.username = username;
      this.userId = userId; 
      this.userRole = userRole; 
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId); 
      console.log("User ID trong updateLoginStatus:", userId);
      console.log(userRole);
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.username = '';
      this.userId = '';
      this.userRole = '';
      localStorage.removeItem('username');
      localStorage.removeItem('userId'); 
      localStorage.removeItem('userRole');
    },
  },
};
</script>
<style>
#app {
  position: relative;
  min-height: 100vh;
  color: #040404;
}


</style>
