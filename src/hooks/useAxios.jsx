import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useAxios = () => {
  // ===== GET =====
  const getData = async (url, config = {}) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Fetch failed");
      throw error;
    }
  };

  // ===== POST =====
  const postData = async (url, payload, config = {}) => {
    try {
      const res = await axiosInstance.post(url, payload, config);
      toast.success(res?.data?.message || "Created successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Create failed");
      throw error;
    }
  };

  // ===== PATCH =====
  const patchData = async (url, payload, config = {}) => {
    try {
      const res = await axiosInstance.patch(url, payload, config);
      toast.success(res?.data?.message || "Updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
      throw error;
    }
  };

  // ===== DELETE =====
  const deleteData = async (url, config = {}) => {
    try {
      const res = await axiosInstance.delete(url, config);
      toast.success(res?.data?.message || "Deleted successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
      throw error;
    }
  };

  return {
    getData,
    postData,
    patchData,
    deleteData,
  };
};

export default useAxios;
