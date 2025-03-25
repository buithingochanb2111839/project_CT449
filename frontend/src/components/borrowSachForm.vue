<template>
  <form @submit.prevent="borrowBook">
    <div class="form-group">
      <label for="borrowDate">Ngày Nhận:</label>
      <input type="date" v-model="borrowDate" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="returnDate">Ngày Trả:</label>
      <input type="date" v-model="returnDate" class="form-control" required />
    </div>

    <button type="submit" class="btn btn-success mt-2">Mượn Sách</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  props: {
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  emits: ["borrow:success"],
  data() {
    return {
      borrowDate: "",
      returnDate: "",
    };
  },
  methods: {
    async borrowBook() {
      try {
        const payload = {
          MaDocGia: this.userId,
          MaSach: this.bookId,
          NgayMuon: this.borrowDate,
          NgayTra: this.returnDate,
        };

        await axios.post("http://localhost:3000/api/theodoi", payload);
        alert("Mượn sách thành công!");
        this.$emit("borrow:success");
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    },
  },
};
</script>
