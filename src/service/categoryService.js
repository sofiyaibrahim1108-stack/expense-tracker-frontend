const API_URL = "http://localhost:3005/api/category";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
});

export const getCategories = async (token) => {
  const res = await fetch(API_URL, { headers: getHeaders(token) });
  return res.json();
};

export const createCategory = async (data, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCategory = async (id, data, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCategory = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return res.json();
};