import { CHATS_URL } from "@/lib/apiEndPoints";

export async function fetchChat(groupId: string) {
  const res = await fetch(`${CHATS_URL}/${groupId}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed To Fetch Data.");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
