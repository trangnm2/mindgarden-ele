// KHONG SUA KHI DOI GAME
import { GAME_TEXTS } from "@/fe/theme";

export const resolvePlayerName = (username?: string): string => {
  if (typeof username === 'string' && username.trim()) return username.trim();

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const paramName = urlParams.get('name');
    if (paramName && paramName.trim()) return paramName.trim();
  }

  return GAME_TEXTS.playerDefaultName;
};
