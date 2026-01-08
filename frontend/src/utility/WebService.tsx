import axios from "axios";
import { toast } from "react-hot-toast";

export interface PropData<Req = Record<string, unknown>, Res = Record<string, unknown>> {
  action: string;
  body?: Req;
  id?: string;
  isFormData?: boolean;
}

const WebService = {

  getBaseUrl() {
    return "http://localhost:5000/api/"; // backend base URL
  },

  getHeaders() {
    const token = sessionStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  },

  addLoader(id?: string) {
    if (!id) return;
    const button = document.getElementById(id) as HTMLButtonElement | null;
    if (button) {
      button.disabled = true;
      const loader = document.createElement("img");
      loader.src = "/images/loading.gif";
      loader.className = "button-loader";
      button.prepend(loader);
    }
  },

  removeLoader(id?: string) {
    if (!id) return;
    const button = document.getElementById(id) as HTMLButtonElement | null;
    if (button && button.firstChild) {
      button.removeChild(button.firstChild);
      button.disabled = false;
    }
  },

  errorHandler(err: unknown) {
    // console.error(err.response?.data?.message);
    let msg = "Server error";
    if (axios.isAxiosError(err)) {
      msg = err.response?.data?.message || msg;
      if (err.response?.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
      }
    }
    toast.error(msg);
    return msg;
  },

  async postAPI<Req = Record<string, unknown>, Res = Record<string, unknown>>(
    props: PropData<Req, Res>
  ): Promise<Res> {
    this.addLoader(props.id);

    try {
      let data: Req | FormData = props.body as Req;

      // Handle FormData
      if (props.isFormData && props.body) {
        const form = new FormData();
        Object.entries(props.body).forEach(([key, value]) => {
          form.append(key, String(value));
        });
        data = form;
      }

      const res = await axios.post<Res>(this.getBaseUrl() + props.action, data, {
        headers: this.getHeaders(),
      });

      return res.data;
    } catch (err) {
      this.errorHandler(err);
      throw err;
    } finally {
      this.removeLoader(props.id);
    }
  },

  async getAPI<T>(action: string): Promise<T> {
    const res = await axios.get<T>(this.getBaseUrl() + action, {
      headers: this.getHeaders(),
    });
    return res.data;
  },

  async fileUploadAPI<Req = Record<string, unknown>, Res = Record<string, unknown>>(
    props: {
      action: string;
      file: File;
      key?: string;          // default "file"
      id?: string;
      onProgress?: (p: number) => void;
    }
  ): Promise<Res> {

    this.addLoader(props.id);

    try {
      const formData = new FormData();

      // ✅ append file
      formData.append(props.key || "file", props.file);

      const res = await axios.post<Res>(
        this.getBaseUrl() + props.action,
        formData,
        {
          headers: {
            Authorization: this.getHeaders().Authorization,
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          onUploadProgress: (e) => {
            if (e.total && props.onProgress) {
              const percent = Math.round(
                (e.loaded * 100) / e.total
              );
              props.onProgress(percent);
            }
          },
        }
      );

      return res.data;

    } catch (err) {
      this.errorHandler(err);
      throw err;
    } finally {
      this.removeLoader(props.id);
    }
  }

};

export default WebService;
