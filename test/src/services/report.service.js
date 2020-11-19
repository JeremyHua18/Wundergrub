import http from "../http-common";

class ReportDataService {
  getAll() {
    return http.get("/reports");
  }

  get(id) {
    return http.get(`/reports/${id}`);
  }

  getUser(id) {
    return http.get(`/reports/user/${id}`);
  }

  create(data) {
    return http.post("/reports", data);
  }

  update(id, data) {
    return http.put(`/reports/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reports/${id}`);
  }

  deleteAll() {
    return http.delete(`/reports`);
  }
}

export default new ReportDataService();