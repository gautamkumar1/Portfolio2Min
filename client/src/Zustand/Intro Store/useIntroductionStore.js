import { create } from "zustand";
import userDp from "../../assets/dummydp.jpg";


const fallbackData = {
  fullName: "Gautam Kumar",
  status: "#OpenToWork",
  title: "Hire Me!",
  roleDescription: "Full Stack Developer focused on learning through experimentation and product development.",
  location: "Noida, UP, India",
  image: userDp,
  socialLinks: {
    gmail: "#",
    phone: "#",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  about: "Passionate Software Developer with a strong foundation in full-stack development...",
};

const useIntroductionStore = create((set) => ({
  data: null,
  loading: true,
  source: "unknown", // State to identify the source of data
 
  fetchIntroData: async (username = null) => { 
    set({ loading: true });
    try {
      // Determine API endpoint based on whether username is provided
      const apiEndpoint = username
        ? `/api/user/getIntroForPortfolio/${username}`
        : `/api/user/getIntro`;

      // Set up headers conditionally based on the endpoint
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      
      if (!username) {
        headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      }

      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });
      
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          set({ data: responseData.data, loading: false, source: username ? "portfolio" : "intro" });
        } else {
          set({ data: fallbackData, loading: false, source: "fallback" });
        }
      } else {
        set({ data: fallbackData, loading: false, source: "fallback" });
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
      set({ data: fallbackData, loading: false, source: "fallback" });
    }
  },
}));

export default useIntroductionStore;
