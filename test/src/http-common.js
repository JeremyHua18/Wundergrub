import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-100-26-161-246.compute-1.amazonaws.com:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});