import BaseService from "./base.service";

class NXBService extends BaseService {
  constructor() {
    super("/api/nxb");
  }
}

export default new NXBService();
