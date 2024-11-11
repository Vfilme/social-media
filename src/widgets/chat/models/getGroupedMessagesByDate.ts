import { getDayMonthYearWithMyTimeZone } from './getDayMonthYearWithMyTimeZone';

export const getGropedMessagesByDate = (messages: any): any[] => {
  let dateWithMessages: any = {};

  (messages as any).forEach((message: any) => {
    const dayMonthYear = getDayMonthYearWithMyTimeZone(message.sent_at);
    dateWithMessages[dayMonthYear] = [
      ...(dateWithMessages[dayMonthYear] || []),
      message,
    ];
  });

  return Object.entries(dateWithMessages);
};
