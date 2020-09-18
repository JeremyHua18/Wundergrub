import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(username) {
    return http.get(`/users/${username}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(username, data) {
    return http.put(`/users/${username}`, data);
  }

  delete(username) {
    return http.delete(`/users/${username}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }
}

export default new UserDataService();