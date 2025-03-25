<template>
  <Form ref="form" @submit="submitNhanVien" :validation-schema="addNhanVienFormSchema">
    <div class="form-group">
      <label for="HoTenNV">Họ Tên:</label>
      <Field id="HoTenNV" name="HoTenNV" as="input" type="text" class="form-control" v-model="nhanVienLocalStorage.HoTenNV" />
      <ErrorMessage name="HoTenNV" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="SoDienThoai">Số Điện Thoại:</label>
      <Field id="SoDienThoai" name="SoDienThoai" as="input" type="tel" class="form-control" v-model="nhanVienLocalStorage.SoDienThoai" />
      <ErrorMessage name="SoDienThoai" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="Password">Mật Khẩu:</label>
      <Field id="Password" name="Password" as="input" type="password" class="form-control" v-model="nhanVienLocalStorage.Password" />
      <ErrorMessage name="Password" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="ChucVu">Chức Vụ:</label>
      <Field id="ChucVu" name="ChucVu" as="input" type="text" class="form-control" v-model="nhanVienLocalStorage.ChucVu" />
      <ErrorMessage name="ChucVu" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="DiaChi">Địa Chỉ:</label>
      <Field id="DiaChi" name="DiaChi" as="input" type="text" class="form-control" v-model="nhanVienLocalStorage.DiaChi" />
      <ErrorMessage name="DiaChi" class="error-feedback" />
    </div>

    <div class="form-group text-center mt-3">
      <button type="submit" class="btn btn-primary">Thêm Nhân Viên</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: { Form, Field, ErrorMessage },
  emits: ["submit:nhanvien"],
  data() {
    const addNhanVienFormSchema = yup.object().shape({
      HoTenNV: yup.string().required("Họ tên không được để trống."),
      SoDienThoai: yup
        .string()
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ.")
        .required("Số điện thoại là bắt buộc."),
      Password: yup.string().required("Mật khẩu không được để trống.").min(6, "Mật khẩu tối thiểu 6 ký tự."),
      ChucVu: yup.string().required("Chức vụ không được để trống."),
      DiaChi: yup.string().required("Địa chỉ không được để trống."),
    });

    return {
      nhanVienLocalStorage: {
        HoTenNV: "",
        SoDienThoai: "",
        Password: "",
        ChucVu: "",
        DiaChi: "",
      },
      addNhanVienFormSchema,
    };
  },
  methods: {
    async submitNhanVien() {
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        this.$emit("submit:nhanvien", this.nhanVienLocalStorage);
      }
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>
