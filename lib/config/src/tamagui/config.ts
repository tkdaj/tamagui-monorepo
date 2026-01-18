import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { defaultConfig } from '@tamagui/config/v5';
import { themes, tokens } from '@tamagui/themes';
import { createAnimations } from '@tamagui/animations-css';

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations: {
    ...defaultConfig.animations,
    ...animations,
  },
  themes,
  tokens,
  shorthands,
});

export default tamaguiConfig;

export type AppConfig = typeof tamaguiConfig;
