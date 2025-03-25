<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <div class="mb-3">
      <label for="TenSach" class="form-label">Tên Sách</label>
      <input type="text" id="TenSach" v-model="localSach.TenSach" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="DonGia" class="form-label">Đơn Giá</label>
      <input type="number" id="DonGia" v-model="localSach.DonGia" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="SoQuyen" class="form-label">Số Quyển</label>
      <input type="number" id="SoQuyen" v-model="localSach.SoQuyen" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="NamXuatBan" class="form-label">Năm Xuất Bản</label>
      <input type="number" id="NamXuatBan" v-model="localSach.NamXuatBan" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="NhaXuatBan" class="form-label">Nhà Xuất Bản</label>
      <select v-model="localSach.NhaXuatBan" class="form-select" required>
        <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
          {{ nxb.TenNXB }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label for="TacGia" class="form-label">Tác Giả</label>
      <input type="text" id="TacGia" v-model="localSach.TacGia" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="coverImage" class="form-label">Ảnh Bìa</label>
      <input type="file" id="coverImage" @change="handleFileUpload" class="form-control" />
    </div>

    <button type="submit" class="btn btn-primary">Lưu Thay Đổi</button>
    <p v-if="message" class="mt-3 text-success">{{ message }}</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    sach: { type: Object, required: true },
    nxbList: { type: Array, default: () => [] },
  },
  emits: ['sach:updated'],
  data() {
    return {
      localSach: { ...this.sach },
      coverImage: null,
      message: '',
    };
  },
  methods: {
    handleFileUpload(e) {
      this.coverImage = e.target.files[0];
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        Object.entries(this.localSach).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (this.coverImage) {
          formData.append('coverImage', this.coverImage);
        }

        await axios.put(`/api/sach/${this.localSach._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        this.message = 'Sách đã được cập nhật thành công!';
        this.$emit('sach:updated', this.localSach);
      } catch (error) {
        this.message = `Lỗi cập nhật sách: ${error.response?.data?.message || error.message}`;
      }
    },
  },
};
</script>
