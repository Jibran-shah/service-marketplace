import { Button } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useCreateDirectChat } from "../../hooks/api/directChats/directChats.hooks";
import { setSelectedChat } from "../../store/slices/chat.slice";

/** @type {import("@mui/material").SxProps} */
const buttonSx = {
  alignSelf: "center",
  minWidth: 120,
  px: 2,
  py: 1,
  borderRadius: 1.5,
  textTransform: "none",
  fontWeight: 600,
};

const ChatButton = ({ id }) => {
  const { mutate, isPending } = useCreateDirectChat();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChat = () => {
    mutate(id, {
      onSuccess: (data) => {
        dispatch(setSelectedChat(data.chat));
        navigate("/chats");
      },
    });
  };

  return (
    <Button
      variant="contained"
      startIcon={<ChatBubbleOutlineOutlinedIcon />}
      onClick={onChat}
      disabled={isPending}
      sx={buttonSx}
    >
      {isPending ? "Opening..." : "Message"}
    </Button>
  );
};

export default ChatButton;