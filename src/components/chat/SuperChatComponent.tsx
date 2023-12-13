import {
  createClient,
  type RealtimeChannelSendResponse,
  type REALTIME_LISTEN_TYPES,
  type RealtimeChannel,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { env } from "~/env";

type MessagePayload = {
  type: `${REALTIME_LISTEN_TYPES.BROADCAST}`;
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function createChatRoom(
  roomName: string,
  supa: SupabaseClient,
  recieverCallback: (message: MessagePayload) => void,
) {
  const room: RealtimeChannel = supa.channel(roomName, {
    config: {
      broadcast: { self: true },
    },
  });
  //
  room
    .on("broadcast", { event: "test" }, (payload: MessagePayload) =>
      recieverCallback(payload),
    )
    .subscribe();
}

function listenToMessagesCallback(payload: MessagePayload) {
  console.log("Message Recieved: ", payload);
}

async function sendMessage(
  message: string,
  room: RealtimeChannel,
): Promise<RealtimeChannelSendResponse> {
  // Send a message once the client is subscribed
  return await room.send({
    type: "broadcast",
    event: "test",
    payload: { message: message },
  });
}

export default function SuperChatComponent() {
  const client = createClient(env.SUPA_URL, env.SUPA_ANON);

  return <></>;
}
