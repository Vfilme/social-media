export const checkOnline = (usersOnline: any[], login: string) => {
  let online = false;
  if (usersOnline) {
    usersOnline.forEach((user) => {
      if (login == user) {
        online = true;
      }
    });
  }
  return online;
};
