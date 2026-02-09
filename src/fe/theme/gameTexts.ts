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
