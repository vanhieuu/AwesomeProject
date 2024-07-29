import { SvgIconTypes } from '@assets/svgIcon';
import {StyleProp, ViewStyle} from 'react-native';


export interface SvgIconProps {
  /**
   * Source of svg file
   * @default undefined
   */
  source: SvgIconTypes;

  /**
   * Size of svg icon
   * @default 24
   */
  size?: number;

  /**
   * Fill color for icon
   * @default #000
   */
  color?: string;

  /**
   * Overwrite fill color with theme
   */
  colorTheme?: any;

  /**
   * Function press icon
   * @default undefined
   */
  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
}
