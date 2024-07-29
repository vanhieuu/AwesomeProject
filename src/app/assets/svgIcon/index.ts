import Sim from './source/sim2.svg';
import ActiveSim from './source/tablet.svg';
import TradeLocation from './source/shop-window.svg';
import GMBLogo from './source/Gmb.svg';
import CallIcon from './source/call.svg';
import CloseIcon from './source/cancel.svg';
import WhiteCheck from './source/Check.svg';
import LeftArrow from './source/leftArrow.svg';
import EndowIcon from './source/gift.svg';
import ServiceIcon from './source/service.svg';
import UserInforIcon from './source/userInfor.svg';
import HomeIcon from './source/iconHome.svg';
import SearchIcon from './source/search.svg';
import AccountIcon from './source/account.svg';
import NotificationIcon from './source/notification.svg'
export const SvgComponent = {
  Sim,
  NotificationIcon,
  AccountIcon,
  ActiveSim,
  TradeLocation,
  GMBLogo,
  SearchIcon,
  CallIcon,
  CloseIcon,
  WhiteCheck,
  LeftArrow,
  EndowIcon,
  ServiceIcon,
  UserInforIcon,
  HomeIcon
};

export type SvgIconTypes = keyof typeof SvgComponent;
