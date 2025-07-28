import React, { useEffect, useState } from "react";
import "./createPage.css";
import { Upload, X, Pencil } from "lucide-react";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import Editor from "../../components/Editor/Editor";

const CreatePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setPreview({
            url: reader.result,
            width: img.width,
            height: img.height,
          });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const editImage = () => {
    setIsEditing(true);
  };

  const doneEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Edit your pic" : "Create Page"}</h1>
        <button onClick={isEditing ? doneEditing : undefined}>
          {isEditing ? "Done" : "Publish"}
        </button>
      </div>

      <div className="createBottom">
        {isEditing ? (
          <Editor preview={preview} />
        ) : (
          <>
            <label className="upload cursor-pointer relative">
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview.url}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      onClick={editImage}
                      className="bg-black/70 text-white p-1 rounded-full hover:bg-black"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-black/70 text-white p-1 rounded-full hover:bg-black"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="uploadTitle">
                    <Upload />
                  </div>
                  <div className="uploadInfo">
                    Click to upload a high-quality .jpg (max 200MB)
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <form className="createForm">
              <div className="createFormItem">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Add a title"
                  name="title"
                  id="title"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={6}
                  placeholder="Add a detailed description"
                  name="description"
                  id="description"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  placeholder="Add a link"
                  name="link"
                  id="link"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="board">Board</label>
                <select name="board" id="board">
                  <option value="">Choose a board</option>
                  <option value="1">Board 1</option>
                  <option value="2">Board 2</option>
                  <option value="3">Board 3</option>
                </select>
              </div>
              <div className="createFormItem">
                <label htmlFor="tags">Tagged topics</label>
                <input
                  type="text"
                  placeholder="Add tags"
                  name="tags"
                  id="tags"
                />
                <small>Don&apos;t worry, people won&apos;t see your tags</small>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
