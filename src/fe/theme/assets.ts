import mobileBackground from "./images/mobile/background.png";
import mobileMascotRed from "./images/mobile/mascot-red.png";
import mobileMascotGreen from "./images/mobile/mascot-green.png";
import mobileMascotBlue from "./images/mobile/mascot-blue.png";
import mobileQuestionFrame from "./images/mobile/question-frame.png";
import mobileAnswerButton from "./images/mobile/answer-button.png";
import mobileStartLine from "./images/mobile/start-line.png";
import mobileFinishLine from "./images/mobile/finish-line.png";
import mobileBanhChung from "./images/mobile/banh-chung.png";
import mobileSubmitButton from "./images/mobile/submit-button.png";
import mobileContinueButton from "./images/mobile/continue-button.png";

import pcBackground from "./images/desktop/background.png";
import pcMascotRed from "./images/desktop/mascot-red.png";
import pcMascotGreen from "./images/desktop/mascot-green.png";
import pcMascotBlue from "./images/desktop/mascot-blue.png";
import pcQuestionFrame from "./images/desktop/question-frame.png";
import pcAnswerButton from "./images/desktop/answer-button.png";
import pcStartLine from "./images/desktop/start-line.png";
import pcFinishLine from "./images/desktop/finish-line.png";
import pcBanhChung from "./images/desktop/banh-chung.png";

export const ASSETS = {
  mobile: {
    background: mobileBackground,
    mascotRed: mobileMascotRed,
    mascotGreen: mobileMascotGreen,
    mascotBlue: mobileMascotBlue,
    questionFrame: mobileQuestionFrame,
    answerButton: mobileAnswerButton,
    startLine: mobileStartLine,
    finishLine: mobileFinishLine,
    banhChung: mobileBanhChung,
    submitButton: mobileSubmitButton,
    continueButton: mobileContinueButton,
  },
  desktop: {
    background: pcBackground,
    mascotRed: pcMascotRed,
    mascotGreen: pcMascotGreen,
    mascotBlue: pcMascotBlue,
    questionFrame: pcQuestionFrame,
    answerButton: pcAnswerButton,
    startLine: pcStartLine,
    finishLine: pcFinishLine,
    banhChung: pcBanhChung,
    submitButton: mobileSubmitButton,
    continueButton: mobileContinueButton,
  }
};

export type AssetSet = typeof ASSETS.mobile;

export const getAssets = (deviceType: 'mobile' | 'desktop'): AssetSet => ASSETS[deviceType];
