import BaseService from "./base.service";

class TheoDoiService extends BaseService {
  constructor() {
    super("/api/theodoi");
  }

  async getByDocGia(idDocGia) {
    return (await this.api.get(`/docgia/${idDocGia}`)).data;
  }
}

export default new TheoDoiService();
