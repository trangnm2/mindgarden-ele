# Huong dan tao game moi tu template

## Quan trong: Chi can sua folder `src/fe/theme/`

Khi doi game theme, **tat ca cau hinh, hinh anh, am thanh, mau sac, text** deu nam trong folder `src/fe/theme/`.
Noi AI: "Doc folder src/fe/theme/ va doi thanh [ten game moi]" la du.

## Cac file trong `src/fe/theme/`

| File/Folder | Chuc nang | Vi du |
|---|---|---|
| `images/mobile/` | Hinh anh mobile | Background, mascot, buttons |
| `images/desktop/` | Hinh anh desktop | Background, mascot, buttons |
| `assets.ts` | Map hinh anh vao config | Import tu ./images/ |
| `uiConfig.ts` | Kich thuoc, vi tri cac thanh phan UI | Score display, question box, race track |
| `gameTexts.ts` | Text hien thi trong game | "Dang tai...", "VE DICH!", "Tra loi" |
| `audio.ts` | URL am thanh | Click, correct, wrong, finish |
| `gameSettings.ts` | Cai dat game | So cau hoi, API endpoint |
| `colors.css` | Mau sac chu dao (CSS variables) | Primary, accent, answer colors |
| `mockQuestions.ts` | Cau hoi mau cho sample mode | 5 cau hoi demo |

## Checklist khi doi game

### 1. Hinh anh
- **Folder:** `src/fe/theme/images/mobile/` va `src/fe/theme/images/desktop/`
- Thay hinh anh truc tiep, giu nguyen ten file
- Neu doi ten file, cap nhat `src/fe/theme/assets.ts`

### 2. Asset mapping
- **File:** `src/fe/theme/assets.ts`
- Chi can sua neu doi ten file hinh anh

### 3. UI Config
- **File:** `src/fe/theme/uiConfig.ts`
- Dieu chinh kich thuoc, vi tri cac thanh phan UI cho mobile va desktop

### 4. Text hien thi
- **File:** `src/fe/theme/gameTexts.ts`
- Doi text loading, ket qua, nut bam, ten player mac dinh

### 5. Am thanh
- **File:** `src/fe/theme/audio.ts`
- Thay URL am thanh: click, correct, wrong, finish

### 6. Cai dat game
- **File:** `src/fe/theme/gameSettings.ts`
- Doi so cau hoi, API endpoint, bat/tat sample mode

### 7. Mau sac
- **File:** `src/fe/theme/colors.css`
- Doi CSS variables de thay doi mau sac toan bo game

### 8. Cau hoi mau
- **File:** `src/fe/theme/mockQuestions.ts`
- Doi cau hoi demo khi chay sample mode

### 9. CSS theo component (tuy chon, khi can tinh chinh sau)
- `src/fe/components/ScoreIndicator/ScoreIndicator.css`
- `src/fe/components/QuestionPanel/QuestionPanel.css`
- `src/fe/components/AnswerOptionList/AnswerOptionItem.css`
- `src/fe/components/ActionButton/SubmitButton.css`
- `src/fe/components/GameAnimation/GameAnimation.css`
- `src/fe/components/GameResultScreen/GameResultScreen.css`
- `src/fe/styles/game-layout.css`

### 10. Animation logic (neu game khac kieu dua)
- **File:** `src/fe/hooks/useRaceAnimation.ts`
- Thay doi logic di chuyen bot, hoac tao hook moi

## Cau truc thu muc

```
src/
├── fe/                           Toan bo frontend
│   ├── theme/                    << CHI CAN SUA O DAY KHI DOI GAME >>
│   │   ├── images/
│   │   │   ├── mobile/           Hinh anh mobile
│   │   │   └── desktop/          Hinh anh desktop
│   │   ├── assets.ts             Map hinh anh
│   │   ├── uiConfig.ts           Kich thuoc/vi tri UI
│   │   ├── gameTexts.ts          Text hien thi
│   │   ├── audio.ts              Am thanh
│   │   ├── gameSettings.ts       Cai dat game
│   │   ├── colors.css            Mau sac CSS
│   │   ├── mockQuestions.ts      Cau hoi mau
│   │   └── index.ts              Barrel export
│   ├── components/               UI components (moi cai co CSS rieng)
│   ├── containers/               GameController (flow chinh)
│   ├── context/                  DeviceContext (mobile/desktop)
│   ├── hooks/                    useRaceAnimation, useDeviceDetection
│   ├── styles/                   game-layout.css
│   └── utils/                    resolvePlayerName
├── be/                           Logic layer (KHONG SUA khi doi game)
│   ├── constants/                API action types
│   ├── hooks/                    useQuizAPI, useQuizState, useAudioController
│   └── types/                    TypeScript interfaces
├── pages/                        Routing (KHONG SUA)
├── App.tsx                       Router setup (KHONG SUA)
├── main.tsx                      Entry point (KHONG SUA)
└── index.css                     Base styles (KHONG SUA)
```

## KHONG can sua khi doi game
- `src/be/` - Logic quiz API, state management, audio controller
- `src/fe/components/` - Chi sua CSS neu can tinh chinh giao dien
- `src/fe/containers/` - GameController flow
- `src/fe/context/` - DeviceContext
- `src/fe/hooks/` - Chi sua neu doi kieu animation
- `src/pages/` - Routing
- `src/App.tsx` - Router
- `src/main.tsx` - Entry point
- `src/index.css` - Base styles (mau sac da tach vao theme/colors.css)
