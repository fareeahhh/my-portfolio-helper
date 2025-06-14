import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------ AUTH ------------------

// 🔄 REGISTER: POST /users/register
export const register = (userData) => API.post("/users/register", userData);

// 🔐 LOGIN: POST /users/login
// export const login = (credentials) => API.post("/users/login", credentials);
export const login = async (credentials) => {
  const res = await API.post("/users/login", credentials);
  localStorage.setItem("token", res.data.token); // store token
  return res;
};

// 🚪 LOGOUT: POST /users/logout
export const logout = () => API.post("/users/logout");

// 👤 PROFILE: GET /users/me (if implemented)
export const getUserProfile = () => API.get("/users/me");

// 🔧 Additional user actions
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// ------------------ PUBLICATIONS ------------------
export const getPublications = () => API.get("/publications");
export const createPublication = (data) => API.post("/publications", data);
export const updatePublication = (id, data) =>
  API.put(`/publications/${id}`, data);
export const deletePublication = (id) => API.delete(`/publications/${id}`);

// ------------------ PROJECTS ------------------
export const getProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// ------------------ TEACHING ------------------
export const getCourses = () => API.get("/teaching");
export const createCourse = (data) => API.post("/teaching", data);
export const updateCourse = (id, data) => API.put(`/teaching/${id}`, data);
export const deleteCourse = (id) => API.delete(`/teaching/${id}`);

// ------------------ PRESENTATIONS ------------------
export const getPresentations = () => API.get("/presentations");
export const createPresentation = (data) => API.post("/presentations", data);
export const updatePresentation = (id, data) =>
  API.put(`/presentations/${id}`, data);
export const deletePresentation = (id) => API.delete(`/presentations/${id}`);

// ------------------ GRANTS ------------------
export const getGrants = () => API.get("/grants");
export const createGrant = (data) => API.post("/grants", data);
export const updateGrant = (id, data) => API.put(`/grants/${id}`, data);
export const deleteGrant = (id) => API.delete(`/grants/${id}`);

// ------------------ MEDIA ------------------
export const getMedia = () => API.get("/media");
export const createMedia = (data) => API.post("/media", data);
export const updateMedia = (id, data) => API.put(`/media/${id}`, data);
export const deleteMedia = (id) => API.delete(`/media/${id}`);

// ------------------ GALLERY ------------------
export const getGalleryItems = () => API.get("/gallery");
export const createGalleryItem = (data) => API.post("/gallery", data);
export const updateGalleryItem = (id, data) => API.put(`/gallery/${id}`, data);
export const deleteGalleryItem = (id) => API.delete(`/gallery/${id}`);

// ------------------ BLOG ------------------
export const getBlogs = () => API.get("/blog");
export const createBlog = (data) => API.post("/blog", data);
export const updateBlog = (id, data) => API.put(`/blog/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);

// ------------------ ANALYTICS ------------------
export const getAnalytics = () => API.get("/analytics");

// ------------------ CONTACT ------------------
// If you set up a contact route (optional)
export const sendContactMessage = (data) => API.post("/contact", data);
