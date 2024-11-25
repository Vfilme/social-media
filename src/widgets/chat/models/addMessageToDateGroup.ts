import { getDayMonthYearWithMyTimeZone } from './getDayMonthYearWithMyTimeZone';

export function addMessageToDateGroup(dateWithMessages: any, message: any) {
  const dayMonthYearOfMessage = getDayMonthYearWithMyTimeZone(message.sent_at);
  const objDateWithMessages = Object.fromEntries(dateWithMessages);
  objDateWithMessages[dayMonthYearOfMessage] = [
    ...(objDateWithMessages[dayMonthYearOfMessage] || []),
    message,
  ];
  const newDateWithMessages = Object.entries(objDateWithMessages);
  return newDateWithMessages;
}
