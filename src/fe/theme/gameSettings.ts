// KHONG SUA KHI DOI GAME
export const FIXED_TOTAL_QUESTIONS = 5;

export const USE_SAMPLE_DATA = false;

export const API_ENDPOINT = "https://supham.clevai.edu.vn";

export const GAME_TEXTS = {
  loading: "Đang tải câu hỏi...",

  result: {
    winTitle: "VỀ ĐÍCH!",
    loseTitle: "HOÀN THÀNH",
    winMessage: "Chúc mừng! Bạn đã về đích!",
    loseMessage: (score: number, total: number) => `${score}/${total} câu đúng`,
  },

  buttons: {
    submit: "Trả lời",
    continue: "Tiếp tục",
  },

  playerDefaultName: "User",
};

export const MARKER_VISIBILITY = {
  startPC: true,
  startMB: true,
  endPC: true,
  endMB: true,
};

export const MARKER_POSITION = {
  startFrontPC: true,
  startFrontMB: false,
};
