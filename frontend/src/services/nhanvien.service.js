import BaseService from "./base.service";

class NhanVienService extends BaseService {
  constructor() {
    super("/api/nhanvien");
  }

  async login(soDienThoai, password) {
    return (await this.api.post("/login", { SoDienThoai: soDienThoai, Password: password })).data;
  }
}

export default new NhanVienService();
