<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Quản Lý Nhà Xuất Bản</h1>
    <button class="btn btn-primary mb-3" @click="showAddForm = true">Thêm Nhà Xuất Bản</button>

    <div v-if="showAddForm" class="mb-4">
      <h4 style="text-align: center;">Thêm Nhà Xuất Bản</h4>
      <form @submit.prevent="addNXB">
        <div class="mb-3">
          <label for="tenNXB" class="form-label">Tên Nhà Xuất Bản</label>
          <input type="text" v-model="newNXB.TenNXB" class="form-control" id="tenNXB" required>
        </div>
        <div class="mb-3">
          <label for="diaChi" class="form-label">Địa Chỉ</label>
          <input type="text" v-model="newNXB.DiaChi" class="form-control" id="diaChi" required>
        </div>
        <div class="mb-3">
          <label for="dienThoai" class="form-label">Điện Thoại</label>
          <input type="text" v-model="newNXB.DienThoai" class="form-control" id="dienThoai">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success mr-3">Lưu</button>
          <button type="button" class="btn btn-danger" @click="showAddForm = false">Hủy</button>
        </div>
      </form>
    </div>

    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th><strong>Tên Nhà Xuất Bản</strong></th>
          <th><strong>Địa Chỉ</strong></th>
          <th><strong>Điện Thoại</strong></th>
          <th><strong>Hành Động</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nxb in nxbs" :key="nxb._id">
          <td>{{ nxb.TenNXB }}</td>
          <td>{{ nxb.DiaChi }}</td>
          <td>{{ nxb.DienThoai }}</td>
          <td>
            <div class="text-center">
              <button class="btn btn-warning btn-sm mr-2" @click="editNXB(nxb)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteNXB(nxb._id)">Xóa</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showEditForm">
      <h4 style="text-align: center;">Sửa Nhà Xuất Bản</h4>
      <form @submit.prevent="updateNXB">
        <div class="mb-3">
          <label for="editTenNXB" class="form-label">Tên Nhà Xuất Bản</label>
          <input type="text" v-model="currentNXB.TenNXB" class="form-control" id="editTenNXB" required>
        </div>
        <div class="mb-3">
          <label for="editDiaChi" class="form-label">Địa Chỉ</label>
          <input type="text" v-model="currentNXB.DiaChi" class="form-control" id="editDiaChi" required>
        </div>
        <div class="mb-3">
          <label for="editDienThoai" class="form-label">Điện Thoại</label>
          <input type="text" v-model="currentNXB.DienThoai" class="form-control" id="editDienThoai">
        </div>
        <div class="text-center mb-4">
          <button type="submit" class="btn btn-success mr-3">Cập Nhật</button>
          <button type="button" class="btn btn-danger" @click="cancelEdit">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'nxb',
  data() {
    return {
      nxbs: [],
      newNXB: {
        TenNXB: '',
        DiaChi: '',
        DienThoai: '',
      },
      currentNXB: {},
      showAddForm: false,
      showEditForm: false,
    };
  },
  methods: {
    async fetchNXBs() {
      try {
        const response = await axios.get('/api/nxb'); 
        this.nxbs = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà xuất bản:', error);
      }
    },
    async addNXB() {
      try {
        const response = await axios.post('/api/nxb', this.newNXB);
        this.nxbs.push(response.data);
        this.newNXB = { TenNXB: '', DiaChi: '', DienThoai: '' };
        this.showAddForm = false;
        alert('Thêm nhà xuất bản thành công!'); 
      } catch (error) {
        console.error('Lỗi khi thêm nhà xuất bản:', error);
        alert('Lỗi khi thêm nhà xuất bản'); 
      }
    },
    editNXB(nxb) {
      this.currentNXB = { ...nxb };
      this.showEditForm = true;
      this.showAddForm = false; 
    },
    async updateNXB() {
  try {
    const response = await axios.put(`/api/nxb/${this.currentNXB._id}`, this.currentNXB);
    
    
    if (response.data) {
      
      const index = this.nxbs.findIndex(n => n._id === this.currentNXB._id);
      if (index !== -1) {
        this.nxbs[index] = response.data; 
      }
      this.showEditForm = false;
      alert('Cập nhật nhà xuất bản thành công!'); 
    } else {
      alert('Cập nhật thất bại!'); 
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật nhà xuất bản:', error);
    alert('Lỗi khi cập nhật nhà xuất bản'); 
  }
},


    async deleteNXB(id) {
  const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?");
  if (isConfirmed) {
    try {
      await axios.delete(`/api/nxb/${id}`);
      this.nxbs = this.nxbs.filter(nxb => nxb._id !== id);
      alert('Xóa nhà xuất bản thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa nhà xuất bản:', error);
      alert('Lỗi khi xóa nhà xuất bản');
    }
  } else {
    alert('Hành động xóa đã bị hủy.');
  }
}

  },
  mounted() {
    this.fetchNXBs();
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
