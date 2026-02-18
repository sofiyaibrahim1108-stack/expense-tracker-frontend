const BASE_URL = "http://localhost:3005/api";

// LOGIN
export async function signInUser(data) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Login failed");
  return result;
}

// SIGNUP (With Multer handling)
export async function signUpUser(formData) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: formData, // No headers for FormData
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Signup failed");
  return result;
}

// FORGOT PASSWORD
export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Verification failed");
  return result;
}

// RESET PASSWORD
export async function resetPassword(data) {
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Reset failed");
  return result;
}

export const updateProfile = async (formData, token) => {
  const res = await fetch("http://localhost:3005/api/updateprofile", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
};