const BASE_URL = "http://localhost:5000/api"; // yeh base URL hai

let API_URL = {
  REGISTER: ${BASE_URL}/auth/register,
  LOGIN: ${BASE_URL}/auth/login,
  UPDATE_PROFILE: ${BASE_URL}/user/update,
  USER_DASHBOARD: ${BASE_URL}/user/dashboard,
  UPLOAD_NOTES: ${BASE_URL}/notes/upload,

  ADMIN_LOGIN: ${BASE_URL}/admin/login,
  ADMIN_USERS: ${BASE_URL}/admin/users,
  ADMIN_NOTES: ${BASE_URL}/notes/all,

  PUBLIC_NOTES: ${BASE_URL}/notes/filters,
}

export default API_URL;