import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import WebService from "../../utility/WebService";
import userimg from "../../assets/avatar-8.jpg";
import toast from "react-hot-toast";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  photo?: string;
}

interface PhotoUploadResponse {
  result: {
    filename: string;
    url?: string;
  };
  message?: string;
}

interface AddEditUserProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<UserFormData>;
}

const roles: { label: string; value: UserRole }[] = [
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
];

const AddEdit = ({ open, onClose, initialData }: AddEditUserProps) => {
  const { register, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues: initialData || { name: "", email: "", password: "", role: "USER", phone: "" },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedPhoto, setUploadedPhoto] = useState<string>(""); // filename

  useEffect(() => {
    if (initialData?.photo) {
      setPreview(initialData.photo);
    } else {
      setPreview(null);
    }
  }, [initialData]);

  if (!open) return null;

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {

      const res = await WebService.postAPI<UserFormData, { message: string }>({
        action: "users/adduser",
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          phone: data.phone,
          photo: uploadedPhoto, // filename only
        },
        id: "submit-btn",
      });
      toast.success(res.message || "User saved successfully");
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (file: File): Promise<PhotoUploadResponse> => {
    return await WebService.fileUploadAPI({
      action: "users/userphoto",
      file: file,
      id: "upload-btn",
      onProgress: setProgress,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30">
      <div className="w-full sm:w-[420px] h-full bg-white shadow-xl flex flex-col">

        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{initialData ? "Edit User" : "Add User"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto p-4 space-y-4">

          <div>
            <label className="text-sm text-gray-600">Name *</label>
            <input type="text" {...register("name", { required: true })}
              className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-blue-200" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email *</label>
            <input type="email" {...register("email", { required: true })}
              className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-blue-200" />
          </div>

          {!initialData && (
            <div>
              <label className="text-sm text-gray-600">Password *</label>
              <input type="password" {...register("password", { required: true })}
                className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-blue-200" />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Role *</label>
            <select {...register("role")} className="w-full border rounded px-3 py-2 mt-1">
              {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input type="text" {...register("phone")}
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          {/* Photo Upload */}
          <div className="flex items-center gap-4">
            <img src={preview || userimg} className="w-16 h-16 rounded-full border object-cover" />
            <label className="cursor-pointer text-sm text-blue-600">
              Upload Photo
              {/* <input type="file" accept="image/*" hidden {...register("photo")} /> */}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  // local preview (instant)
                  setPreview(URL.createObjectURL(file));
                  // upload API
                  try {
                    const res: PhotoUploadResponse = await uploadPhoto(file);
                    // backend se filename
                    setUploadedPhoto(res.result.filename);
                    // server image preview (optional)
                    // setPreview(res.result.url);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            </label>
          </div>

          {/* Upload Progress */}
          {progress > 0 && (
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-blue-600 h-2 rounded" style={{ width: `${progress}%` }} />
            </div>
          )}

        </form>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 border rounded py-2 hover:bg-gray-100">Cancel</button>
          <button
            type="submit"
            id="submit-btn"
            disabled={loading || progress > 0}
            className="flex-1 bg-blue-600 disabled:opacity-50 text-white rounded py-2 hover:bg-blue-700"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddEdit;
