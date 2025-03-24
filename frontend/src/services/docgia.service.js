import BaseService from "./base.service";

class DocGiaService extends BaseService {
  constructor() {
    super("/api/docgia");
  }

  async login(email, password) {
    return (await this.api.post("/login", { Email: email, Password: password })).data;
  }

  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
}

export default new DocGiaService();
