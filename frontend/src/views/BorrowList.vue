<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Quản Lý Phiếu Mượn</h1>
    <table class="table table-bordered  text-center">
      <thead>
        <tr>
          <th scope="col"><strong>Tên Đọc Giả</strong></th>
          <th scope="col"><strong>Tên Sách</strong></th>
          <th scope="col"><strong>Ngày Mượn</strong></th>
          <th scope="col"><strong>Ngày Trả</strong></th>
          <th scope="col"><strong>Số Lượng</strong></th>
          <th scope="col"><strong>Tùy Chọn</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record._id">
          <td>{{ record.MaDocGia ? record.MaDocGia.Ten : 'Không xác định' }}</td>
          <td>{{ record.MaSach ? record.MaSach.TenSach : 'Không xác định' }}</td>
          <td>{{ new Date(record.NgayMuon).toLocaleDateString() }}</td>
          <td>{{ new Date(record.NgayTra).toLocaleDateString() }}</td>
          <td>{{ record.SoLuong }}</td>
          <td>
            <button v-if="isReader" class="btn btn-danger" @click="returnBook(record._id, record.MaSach?._id, record.SoLuong)">
              Trả Sách
            </button>
            <button v-if="isManager" class="btn btn-danger" @click="deleteBook(record._id, record.MaSach?._id, record.SoLuong)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      records: [],
      isReader: false,
      isManager: false
    };
  },
  computed: {
    filteredRecords() {
      if (this.isManager) return this.records;
      if (this.isReader) {
        const userId = localStorage.getItem('userId');
        return this.records.filter(record => record.MaDocGia && record.MaDocGia._id === userId);
      }
      return [];
    }
  },
  methods: {
    async fetchRecords() {
      try {
        const response = await axios.get('/api/theodoi');
        this.records = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách:', error);
      }
    },
    async returnBook(recordId, bookId, quantity) {
      try {
        const response = await axios.get(`/api/sach/${bookId}`);
        const bookQuantity = response.data.SoQuyen;
        await axios.delete(`/api/theodoi/${recordId}`);
        await axios.put(`/api/sach/${bookId}`, { SoQuyen: bookQuantity + quantity });
        this.fetchRecords();
        alert('Trả sách thành công');
      } catch (error) {
        alert('Lỗi khi trả sách');
      }
    },
    async deleteBook(recordId, bookId, quantity) {
      const confirmed = window.confirm("Bạn chắc chắn muốn xóa?");
      if (!confirmed) return;

      try {
        const response = await axios.get(`/api/sach/${bookId}`);
        const bookQuantity = response.data.SoQuyen;
        await axios.delete(`/api/theodoi/${recordId}`);
        await axios.put(`/api/sach/${bookId}`, { SoQuyen: bookQuantity + quantity });
        this.fetchRecords();
        alert('Xóa thành công');
      } catch (error) {
        alert('Lỗi khi xóa');
      }
    },
    checkUserRole() {
      const role = localStorage.getItem('userRole');
      this.isReader = role === 'docgia';
      this.isManager = role === 'nhanvien';
    }
  },
  mounted() {
    this.fetchRecords();
    this.checkUserRole();
  }
};
</script>

<style>
.container {
  max-width: 800px;
}
</style>
