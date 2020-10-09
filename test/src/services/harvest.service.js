import http from "../http-common";

class HarvestDataService {
  getAll() {
    return http.get("/harvests");
  }

  getPending() {
    return http.get("/harvests/pending");
  }

  get(id) {
    return http.get(`/harvests/${id}`);
  }

  create(data) {
    return http.post("/harvests", data);
  }

  update(id, data) {
    return http.put(`/harvests/${id}`, data);
  }

  delete(id) {
    return http.delete(`/harvests/${id}`);
  }

  deleteAll() {
    return http.delete(`/harvests`);
  }
}

export default new HarvestDataService();