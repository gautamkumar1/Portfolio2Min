import { create } from "zustand";
import userDp from "../../assets/dummydp.jpg";

const fallbackData = {
  fullName: "Gautam Kumar",
  status: "#OpenToWork",
  title: "Hire Me!",
  roleDescription: "Full Stack Developer focused on learning through experimentation and product development.",
  location: "Noida, UP, India",
  image: userDp, // Fixed the way to include userDp
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
  fetchIntroData: async () => { // Removed introId parameter
    set({ loading: true });
    try {
      const response = await fetch(`/api/user/getIntro`, { // Changed the API endpoint
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          set({ data: responseData.data, loading: false });
        } else {
          set({ data: fallbackData, loading: false });
        }
      } else {
        set({ data: fallbackData, loading: false });
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
      set({ data: fallbackData, loading: false });
    }
  },
}));

export default useIntroductionStore;
