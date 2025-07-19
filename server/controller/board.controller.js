import Board from "../model/board.model.js";
import Pin from "../model/pin.model.js";
export const getUserBoards = async (req, resp) => {
  const { userId } = req.params;
  const boards = await Board.find({ user: userId });
  const boardsWithPinDetails = await Promise.all(
    boards.map(async (board) => {
      const pinCount = await Pin.countDocuments({ board: board._id });
      const firstPin = await Pin.findOne({ board: board._id });
      return {
        ...board.toObject(),
        pinCount,
        firstPin,
      };
    })
  );
  resp.status(200).json(boardsWithPinDetails);
};
