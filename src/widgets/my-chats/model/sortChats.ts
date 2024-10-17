export const sortChats = (chats: any) => {
  return chats.sort(
    (a: any, b: any) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
  );
};
