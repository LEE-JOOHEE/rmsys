import dayjs from "dayjs";

// ===============================================================
// 달력 공통
// ===============================================================
// datePicker 비활성 - 날짜
export const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

// datePicker 비활성 - 날짜(3개월 전까지만 활성)
export const disabledDateThreeMonthsAgo = (current) => {
  const threeMonthsAgo = dayjs().subtract(3, "month");
  return current > dayjs() || current < threeMonthsAgo;
};

// datePicker 비활성 - 시간
export const disabledTime = (current) => {
  if (!current)
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };

  const currentHour = dayjs().hour();
  const currentMinute = dayjs().minute();
  const currentSecond = dayjs().second();

  return {
    disabledHours: () => {
      // 현재 시간 이후의 시간 비활성화
      const hours = [];
      for (let i = currentHour + 1; i < 24; i++) {
        hours.push(i);
      }
      return hours;
    },
    disabledMinutes: () => {
      if (current.hour() === currentHour) {
        // 현재 시간이면 현재 시간 이후의 분 비활성화
        const minutes = [];
        for (let i = currentMinute + 1; i < 60; i++) {
          minutes.push(i);
        }
        return minutes;
      }
      return [];
    },
    disabledSeconds: () => {
      if (
        current.hour() === currentHour &&
        current.minute() === currentMinute
      ) {
        // 현재 분이면 현재 분 이후의 초 비활성화
        const seconds = [];
        for (let i = currentSecond + 1; i < 60; i++) {
          seconds.push(i);
        }
        return seconds;
      }
      return [];
    },
  };
};

// ===============================================================
// 날짜 시간 변환
// - 사용법(현재시간) : <DateTimeFullFormatterKo dateTime={dayjs()} />
// * DateTimeFullFormatterKo        = 2024년 09월 30일 월요일 15시 00분 00초
// * DateTimeFormatterKo            = 2024년 09월 30일 월요일 15시 00분
// * DateWeekFormatterKo            = 2024년 09월 30일 월요일
// * DateOnlyFormatterKo            = 2024년 09월 30일
// * DateTimeNoWeekFormatterKo      = 2024년 09월 30일 15시 00분 00초
// * TimeOnlyFormatterKo            = 15시 00분 00초
// * TimeOnlyNoSecFormatterKo       = 15시 00분
// * DateTimeFormatterSymbol        = YYYY-MM-DD HH:mm:ss
// * DateFormatterSymbol            = YYYY-MM-DD
// * TimeFormatterSymbol            = HH:mm:ss
// * TimeNoSecFormatterSymbol       = HH:mm
// * DateTimeSimpleFormatterSymbol  = MM-DD HH:mm
// ===============================================================
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};
// 1. ex) 2024년 09월 30일 월요일 15시 00분 00초
export const DateTimeFullFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  const part2 = part1[3].split(" ").slice(0); // 요일,시간 분리
  const weekDay = part2[0];
  const [time] = part1[3].split(" ").slice(-1);
  const [hour, minute, second] = time.split(":");
  return `${part1[0]}년 ${part1[1]}월 ${part1[2]}일 ${weekDay} ${hour}시 ${minute}분 ${second}초`;
};
// 2. ex) 2024년 09월 30일 월요일 15시 00분
export const DateTimeFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  const part2 = part1[3].split(" ").slice(0); // 요일,시간 분리
  const weekDay = part2[0];
  const [time] = part1[3].split(" ").slice(-1);
  const [hour, minute] = time.split(":");
  return `${part1[0]}년 ${part1[1]}월 ${part1[2]}일 ${weekDay} ${hour}시 ${minute}분`;
};
// 3. ex) 2024년 09월 30일 월요일
export const DateWeekFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  const part2 = part1[3].split(" ").slice(0); // 요일,시간 분리
  const weekDay = part2[0];
  return `${part1[0]}년 ${part1[1]}월 ${part1[2]}일 ${weekDay}`;
};
// 4. ex) 2024년 09월 30일
export const DateOnlyFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  return `${part1[0]}년 ${part1[1]}월 ${part1[2]}일`;
};
// 5. 요일없음 - ex) 2024년 09월 30일 15시 00분 00초
export const DateTimeNoWeekFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  const [time] = part1[3].split(" ").slice(-1);
  const [hour, minute, second] = time.split(":");
  return `${part1[0]}년 ${part1[1]}월 ${part1[2]}일 ${hour}시 ${minute}분 ${second}초`;
};
// 6. ex) 15시 00분 00초
export const TimeOnlyFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  const [time] = part1[3].split(" ").slice(-1);
  const [hour, minute, second] = time.split(":");
  return `${hour}시 ${minute}분 ${second}초`;
};
// 7. ex) 15시 00분
export const TimeOnlyNoSecFormatterKo = ({ dateTime }) => {
  const date = new Date(Number(dateTime));
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  const part1 = formattedDate.split(". "); // 날짜 분리
  const [time] = part1[3].split(" ").slice(-1);
  const [hour, minute] = time.split(":");
  return `${hour}시 ${minute}분`;
};
// 8. "YYYY-MM-DD HH:mm:ss"
export const DateTimeFormatterSymbol = ({ dateTime }) => {
  const date = dayjs(Number(dateTime));
  const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
  return `${formattedDate}`;
};
// 9. "YYYY-MM-DD"
export const DateFormatterSymbol = ({ dateTime }) => {
  const date = dayjs(Number(dateTime));
  const formattedDate = date.format("YYYY-MM-DD");
  return `${formattedDate}`;
};
// 10. "HH:mm:ss"
export const TimeFormatterSymbol = ({ dateTime }) => {
  const date = dayjs(Number(dateTime));
  const formattedDate = date.format("HH:mm:ss");
  return `${formattedDate}`;
};
// 11. "HH:mm"
export const TimeNoSecFormatterSymbol = ({ dateTime }) => {
  const date = dayjs(Number(dateTime));
  const formattedDate = date.format("HH:mm");
  return `${formattedDate}`;
};
// 12. "MM-DD HH:mm"
export const DateTimeSimpleFormatterSymbol = ({ dateTime }) => {
  const date = dayjs(Number(dateTime));
  const formattedDate = date.format("MM-DD HH:mm");
  return `${formattedDate}`;
};

// ===============================================================
// 폼요소 공통
// ===============================================================
// InputNumber 다른 키 입력 방지
export const handleInputNumberKeyDown = (e) => {
  // 숫자 키 (0-9) 및 백스페이스, 탭, 엔터키만 허용
  if (
    !(
      (e.key >= "0" && e.key <= "9") ||
      e.key === "Backspace" ||
      e.key === "Tab" ||
      e.key === "Enter" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    )
  ) {
    e.preventDefault();
  }
};

// InputNumber 한글 입력 방지
export const handleInputNumberOnInput = (e) => {
  if (/[\u3131-\u3163\uAC00-\uD7A3]/.test(e.target)) {
    e.preventDefault();
  }
};

// InputNumber 1000단위 콤마
export const formatNumber = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ===============================================================
