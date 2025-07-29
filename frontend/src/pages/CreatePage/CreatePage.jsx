import React, { useEffect, useRef, useState } from "react";
import "./createPage.css";
import { Upload, X, Pencil } from "lucide-react";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import Editor from "../../components/Editor/Editor";
import apiRequest from "../../utils/apiRequests";
import { useMutation, useQuery } from "@tanstack/react-query";
import BoardForm from "./BoardForm";
import useEditorStore from "../../utils/editorStore";

const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(res); // <-- Full Axios response (data, status, headers, config, etc.)
  return res.data; // return data for mutation
};

const CreatePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { textOptions, canvasOptions, resetStore } = useEditorStore();

  const formRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // For new board creation
  const [newBoard, setNewBoard] = useState("");
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

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

  const editImage = () => setIsEditing(true);
  const doneEditing = () => setIsEditing(false);

  // Fetch existing boards
  const {
    data: boards,
    isPending,
    error,
  } = useQuery({
    queryKey: ["formBoards"],
    queryFn: () =>
      apiRequest.get(`/boards/${currentUser._id}`).then((res) => res.data),
  });

  const handleNewBoard = () => setIsNewBoardOpen((prev) => !prev);

  // Mutation for creating the pin
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data, variables, context) => {
      console.log("Final Response:", data); // <-- Only the pin data
      resetStore();
      navigate(`/pin/${data._id}`);
    },
  });

  const handleSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      formData.append("newBoard", newBoard);

      // Debug: Print form data entries

      mutation.mutate(formData);
    }
  };

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Edit your pic" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
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

            <form className="createForm" ref={formRef}>
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

              {/* Boards dropdown with new board option */}
              {!isPending && !error && (
                <div className="createFormItem">
                  <label htmlFor="board">Board</label>
                  <select name="board" id="board">
                    <option value="">Choose a board</option>
                    {boards?.map((board) => (
                      <option value={board._id} key={board._id}>
                        {board.title}
                      </option>
                    ))}
                  </select>
                  <div className="newBoard">
                    {newBoard && (
                      <div className="newBoardContainer">
                        <div className="newBoardItem">{newBoard}</div>
                      </div>
                    )}
                    <div className="createBoardButton" onClick={handleNewBoard}>
                      Create new board
                    </div>
                  </div>
                </div>
              )}

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

            {isNewBoardOpen && (
              <BoardForm
                setIsNewBoardOpen={setIsNewBoardOpen}
                setNewBoard={setNewBoard}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
