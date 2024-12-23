import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/firebase/api";
import { useAuth } from "@/hooks/useAuth";
import { UserDataType } from "@/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

type SendMessageProps = {
  openSendMessagePopup: boolean;
  setOpenSendMessagePopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: UserDataType | null;
};

const SendMessage = ({
  openSendMessagePopup,
  setOpenSendMessagePopup,
  selectedUser,
}: SendMessageProps) => {
  const { currentUser } = useAuth();
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle message submission
  const submitMessage = async () => {
    if (!selectedUser || !messageContent.trim()) return;
    setLoading(true);
    try {
      await sendMessage(selectedUser, messageContent, currentUser?.uid || "");

      setMessageContent("");
      setOpenSendMessagePopup(false);

      toast({
        title: "Message Sent Successfully",
        variant: "default",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Dialog open={openSendMessagePopup} onOpenChange={setOpenSendMessagePopup}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
          <DialogDescription>
            Write a message to {selectedUser?.userName}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Write your message here..."
            className="w-full"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            onClick={() => setOpenSendMessagePopup(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={submitMessage} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SendMessage;
