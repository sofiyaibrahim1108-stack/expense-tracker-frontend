const API_URL = "http://localhost:3005/api/expenses";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
});

export const getExpenses = async (token) => {
  const res = await fetch(API_URL, { headers: getHeaders(token) });
  return res.json();
};

export const createExpense = async (data, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateExpense = async (id, data, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return res.json();
};