import React from "react";
import "./createPage.css";
import Image from "../../components/Image/Image";
import { Upload } from "lucide-react";

const CreatePage = () => {
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Page</h1>
        <button>Publish</button>
      </div>
      <div className="createBottom">
        <div className="upload">
          <div className="uploadTitle">
            <Upload />
          </div>
          <div className="uploadInfo">
            We recommend using high Quality .jpg files less than 20 files less
            than 200 MB
          </div>
        </div>
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
              type="text"
              placeholder="Add a detailed description"
              name="description"
              id="description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="link">Link</label>
            <input type="text" placeholder="Add a link" name="link" id="link" />
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
          {/* FIXED: SELECT OR ADD BOARD */}
          {/* {(!isPending || !error) && (
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option value="">Choose a board</option>
                {data?.map((board) => (
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
          )} */}
          <div className="createFormItem">
            <label htmlFor="tags">Tagged topics</label>
            <input type="text" placeholder="Add tags" name="tags" id="tags" />
            <small>Don&apos;t worry, people won&apos;t see your tags</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
