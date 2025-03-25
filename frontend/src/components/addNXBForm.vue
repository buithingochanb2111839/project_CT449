<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="tenNXB" class="form-label">Tên Nhà Xuất Bản</label>
      <input type="text" v-model="nxb.TenNXB" class="form-control" id="tenNXB" required />
    </div>
    <div class="mb-3">
      <label for="diaChi" class="form-label">Địa Chỉ</label>
      <input type="text" v-model="nxb.DiaChi" class="form-control" id="diaChi" required />
    </div>
    <div class="mb-3">
      <label for="dienThoai" class="form-label">Điện Thoại</label>
      <input type="text" v-model="nxb.DienThoai" class="form-control" id="dienThoai" />
    </div>
    <button type="submit" class="btn btn-success">Lưu</button>
    <button type="button" class="btn btn-danger ms-2" @click="$emit('cancel')">Hủy</button>
  </form>
</template>

<script>
export default {
  props: {
    nxbData: {
      type: Object,
      default: () => ({
        TenNXB: '',
        DiaChi: '',
        DienThoai: '',
      }),
    },
  },
  emits: ['submit:nxb', 'cancel'],
  data() {
    return {
      nxb: { ...this.nxbData },
    };
  },
  methods: {
    submit() {
      this.$emit('submit:nxb', this.nxb);
    },
  },
};
</script>
