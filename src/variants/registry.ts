import * as eleAssets from "./ele/theme/assets";
import * as eleSettings from "./ele/theme/gameSettings";
import EleGameAnimation from "./ele/components/GameAnimation/GameAnimation";
import * as eleFlowers from "./ele/theme/flowers";
import * as eleMockQuestions from "./ele/theme/mockQuestions";

import * as secAssets from "./sec/theme/assets";
import * as secSettings from "./sec/theme/gameSettings";
import SecGameAnimation from "./sec/components/GameAnimation/GameAnimation";
import * as secFlowers from "./sec/theme/flowers";
import * as secMockQuestions from "./sec/theme/mockQuestions";

export type VariantId = "ele" | "sec";

export interface VariantConfig {
  assets: typeof eleAssets;
  settings: typeof eleSettings;
  GameAnimation: typeof EleGameAnimation;
  flowers: typeof eleFlowers;
  mockQuestions: typeof eleMockQuestions;
}

export const variantRegistry: Record<VariantId, VariantConfig> = {
  ele: {
    assets: eleAssets,
    settings: eleSettings,
    GameAnimation: EleGameAnimation,
    flowers: eleFlowers,
    mockQuestions: eleMockQuestions,
  },
  sec: {
    assets: secAssets,
    settings: secSettings,
    GameAnimation: SecGameAnimation,
    flowers: secFlowers,
    mockQuestions: secMockQuestions,
  },
};
