const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

export const api = {
  getMissions: () =>
    request("/missions"),

  getMission: (id) =>
    request(`/missions/${id}`),

  startAttempt: (payload) =>
    request("/attempts", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  submitPuzzle: (id, payload) =>
    request(`/attempts/${id}/puzzle`, {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  getHint: (id, payload) =>
    request(`/attempts/${id}/hint`, {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  submitAttempt: (id, payload) =>
    request(`/attempts/${id}/complete`, {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  getAttempt: (id) =>
    request(`/attempts/${id}`),

  getLeaderboard: () =>
    request("/leaderboard")
};