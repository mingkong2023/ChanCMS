let api = {
  pre: {
    BASE_API: import.meta.env.VITE_APP_BASE_API || "",
  },
  prd: {
    BASE_API: import.meta.env.VITE_APP_BASE_API || "",
  },
};

const env = "pre";

console.log("api[env]", api[env]);
export default api[env];
