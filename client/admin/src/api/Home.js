import http from "../utils/http.js";
import Base from "./Base.js";

export default class Home extends Base {
  constructor(props) {
    super(props);
  }

  static cityCode() {
    return http.get(`${Base.API}/v3/api`);
  }

  static weather() {
    return http.get(`${Base.API}/v3/api`);
  }
}
