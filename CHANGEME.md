# Huong dan tao game moi tu template

## Quan trong: Doc header dong dau cua moi file

Moi file deu co header o dong dau tien:
- `// SUA KHI DOI GAME` hoac `/* SUA KHI DOI GAME */` → File CAN sua khi doi game
- `// KHONG SUA KHI DOI GAME` hoac `/* KHONG SUA KHI DOI GAME */` → File KHONG duoc sua

**Neu thay header `KHONG SUA`, KHONG DUOC SUA file do.**

---

## Danh sach file SUA KHI DOI GAME

### 1. Hinh anh - CHI THAY FILE, GIU NGUYEN TEN
- `src/fe/theme/images/mobile/` → Thay hinh mobile
- `src/fe/theme/images/desktop/` → Thay hinh desktop

Ten file chuan (KHONG doi ten):
| Ten file | Vai tro |
|---|---|
| `background.png` | Hinh nen game |
| `player.png` | Nhan vat nguoi choi |
| `bot1.png` | Bot 1 |
| `bot2.png` | Bot 2 |
| `question-frame.png` | Khung cau hoi |
| `answer-button.png` | Nut tra loi |
| `submit-button.png` | Nut gui dap an |
| `continue-button.png` | Nut tiep tuc |
| `start-icon.png` | Icon xuat phat |
| `finish-icon.png` | Icon dich |
| `score-icon.png` | Icon diem |

### 2. Asset mapping
- `src/fe/theme/assets.ts` → Them/bot slot hinh anh khi doi kieu game (vd: game leo nui khong can bot1, bot2)

### 3. Animation (khi doi kieu gameplay)
- `src/fe/components/GameAnimation/GameAnimation.tsx` → Component hien thi animation (bao gom config vi tri)
- `src/fe/components/GameAnimation/GameAnimation.css` → Style animation
- `src/fe/hooks/useGameAnimation.ts` → Logic di chuyen, toc do animation

---

## Cau truc thu muc day du

```
src/
├── App.tsx                                           KHONG SUA
├── main.tsx                                          KHONG SUA
├── index.css                                         KHONG SUA
│
├── fe/
│   ├── index.ts                                      KHONG SUA
│   │
│   ├── theme/
│   │   ├── images/mobile/                            SUA - thay hinh, giu ten file
│   │   │   ├── background.png                        Hinh nen
│   │   │   ├── player.png                            Nhan vat nguoi choi
│   │   │   ├── bot1.png                              Bot 1
│   │   │   ├── bot2.png                              Bot 2
│   │   │   ├── question-frame.png                    Khung cau hoi
│   │   │   ├── answer-button.png                     Nut tra loi
│   │   │   ├── submit-button.png                     Nut gui
│   │   │   ├── continue-button.png                   Nut tiep tuc
│   │   │   ├── start-icon.png                        Icon xuat phat
│   │   │   ├── finish-icon.png                       Icon dich
│   │   │   └── score-icon.png                        Icon diem
│   │   ├── images/desktop/                           SUA - tuong tu mobile
│   │   ├── assets.ts                                 SUA - map hinh anh, them/bot slot
│   │   ├── index.ts                                  KHONG SUA
│   │   ├── gameSettings.ts                           KHONG SUA
│   │   ├── audio.ts                                  KHONG SUA
│   │   └── mockQuestions.ts                          KHONG SUA
│   │
│   ├── components/
│   │   ├── index.ts                                  KHONG SUA
│   │   ├── ContentRenderer/
│   │   │   ├── HtmlContentRenderer.tsx               KHONG SUA
│   │   │   └── index.ts                              KHONG SUA
│   │   ├── GameAnimation/
│   │   │   ├── GameAnimation.tsx                     SUA - component animation
│   │   │   ├── GameAnimation.css                     SUA - style animation
│   │   │   └── index.ts                              KHONG SUA
│   │   ├── ActionButton/
│   │   │   ├── SubmitButton.tsx                      KHONG SUA
│   │   │   ├── SubmitButton.css                      KHONG SUA
│   │   │   └── index.ts                              KHONG SUA
│   │   ├── AnswerOptionList/
│   │   │   ├── AnswerOptionItem.tsx                  KHONG SUA
│   │   │   ├── AnswerOptionItem.css                  KHONG SUA
│   │   │   └── index.ts                              KHONG SUA
│   │   ├── GameResultScreen/
│   │   │   ├── GameResultScreen.tsx                  KHONG SUA
│   │   │   ├── GameResultScreen.css                  KHONG SUA
│   │   │   └── index.ts                              KHONG SUA
│   │   ├── QuestionPanel/
│   │   │   ├── QuestionPanel.tsx                     KHONG SUA
│   │   │   ├── QuestionPanel.css                     KHONG SUA
│   │   │   └── index.ts                              KHONG SUA
│   │   └── ScoreIndicator/
│   │       ├── ScoreIndicator.tsx                    KHONG SUA
│   │       ├── ScoreIndicator.css                    KHONG SUA
│   │       └── index.ts                              KHONG SUA
│   │
│   ├── hooks/
│   │   ├── useGameAnimation.ts                       SUA - logic animation
│   │   ├── useDeviceDetection.ts                     KHONG SUA
│   │   ├── DeviceContext.tsx                         KHONG SUA
│   │   ├── resolvePlayerName.ts                      KHONG SUA
│   │   └── index.ts                                  KHONG SUA
│   │
│   ├── pages/
│   │   ├── Index.tsx                                 KHONG SUA
│   │   ├── GameController.tsx                        KHONG SUA
│   │   ├── game-layout.css                           KHONG SUA
│   │   └── NotFound.tsx                              KHONG SUA
│
└── be/
    ├── index.ts                                      KHONG SUA
    ├── constants/
    │   ├── APIActions.ts                             KHONG SUA
    │   └── index.ts                                  KHONG SUA
    ├── hooks/
    │   ├── useQuizAPI.ts                             KHONG SUA
    │   ├── useQuizState.ts                           KHONG SUA
    │   ├── useAudioController.ts                     KHONG SUA
    │   └── index.ts                                  KHONG SUA
    └── types/
        ├── Quiz.ts                                   KHONG SUA
        ├── API.ts                                    KHONG SUA
        └── index.ts                                  KHONG SUA
```

## Tom tat

**SUA (6 items):**
- `fe/theme/images/mobile/` - thay hinh, giu nguyen ten file
- `fe/theme/images/desktop/` - thay hinh, giu nguyen ten file
- `fe/theme/assets.ts` - map hinh anh, them/bot slot
- `fe/components/GameAnimation/GameAnimation.tsx` - component animation + config vi tri
- `fe/components/GameAnimation/GameAnimation.css` - style animation
- `fe/hooks/useGameAnimation.ts` - logic animation

**KHONG SUA: Tat ca file con lai**
