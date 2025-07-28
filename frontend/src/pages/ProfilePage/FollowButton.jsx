import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequests";

const FollowButton = ({ isFollowing, userName }) => {
  const queryClient = useQueryClient();

  const followUser = async (userName) => {
    const res = await apiRequest.post(`/users/follow/${userName}`);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userName] });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate(userName)}
      disabled={mutation.isPending}
      className="
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {mutation.isPending
        ? "Processing..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
};

export default FollowButton;
