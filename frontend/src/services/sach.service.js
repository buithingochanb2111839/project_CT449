import BaseService from "./base.service";

class BookService extends BaseService {
  constructor() {
    super("/api/sach");
  }

}

export default new BookService();
