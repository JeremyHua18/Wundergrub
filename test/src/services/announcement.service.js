import http from "../http-common";

class AnnouncementDataService {
  getAll() {
    return http.get("/announcements");
  }

  get(id) {
    return http.get(`/announcements/${id}`);
  }

  create(data) {
    return http.post("/announcements", data);
  }

  update(id, data) {
    return http.put(`/announcements/${id}`, data);
  }

  delete(id) {
    return http.delete(`/announcements/${id}`);
  }

  deleteAll() {
    return http.delete(`/announcements`);
  }
}

export default new AnnouncementDataService();