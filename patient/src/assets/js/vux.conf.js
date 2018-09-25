import Vue from 'vue' //vue框架
import {
  Actionsheet,
  Agree,
  AjaxPlugin,
  Alert,
  AlertPlugin,
  AppPlugin,
  Array2stringFilter,
  Badge,
  base64,
  Blur,
  Box,
  ButtonTab,
  ButtonTabItem,
  Calendar,
  Card,
  Cell,
  CellBox,
  CellFormPreview,
  Checker,
  CheckerItem,
  CheckIcon,
  Checklist,
  ChinaAddressData,
  ChinaAddressV1Data,
  ChinaAddressV2Data,
  ChinaAddressV3Data,
  ClickOutsideDirective,
  Clocker,
  ColorPicker,
  Confirm,
  ConfirmPlugin,
  cookie,
  Countdown,
  Countup,
  dateFormat,
  dateRange,
  Datetime,
  DatetimePlugin,
  DatetimeRange,
  DatetimeView,
  debounce,
  Demobasic,
  Demoindex,
  DevicePlugin,
  DevTip,
  Divider,
  Drawer,
  Flexbox,
  FlexboxItem,
  Flow,
  FlowLine,
  FlowState,
  FormatTimeFilter,
  FormPreview,
  FriendlyTimeFilter,
  Fullpage,
  Grid,
  GridItem,
  Group,
  GroupTitle,
  Icon,
  InlineXSwitch,
  InlineCalendar,
  InlineDesc,
  InlineLoading,
  InlineXNumber,
  InviewDirective,
  Loading,
  LoadingPlugin,
  LoadMore,
  LocalePlugin,
  Marquee,
  MarqueeItem,
  Masker,
  md5,
  Msg,
  Name2valueFilter,
  numberComma,
  numberPad,
  numberRandom,
  numberRange,
  NumberRoller,
  Panel,
  Picker,
  Popover,
  Popup,
  PopupHeader,
  PopupPicker,
  PopupRadio,
  Previewer,
  Qrcode,
  querystring,
  Radio,
  Range,
  Rater,
  Scroller,
  Search,
  Selector,
  Shake,
  Spinner,
  Step,
  StepItem,
  Sticky,
  stringTrim,
  Swipeout,
  SwipeoutButton,
  SwipeoutItem,
  Swiper,
  SwiperItem,
  Tab,
  Tabbar,
  TabbarItem,
  TabItem,
  throttle,
  Timeline,
  TimelineItem,
  Tip,
  Toast,
  ToastPlugin,
  TransferDom,
  TransferDomDirective,
  trim,
  Value2nameFilter,
  Video,
  ViewBox,
  VuxComponentListData,
  WechatEmotion,
  WechatPlugin,
  WepayInput,
  XAddress,
  XButton,
  XCircle,
  XDialog,
  XHeader,
  XHr,
  XImg,
  XInput,
  XNumber,
  XProgress,
  XSwitch,
  XTable,
  XTextarea
} from 'vux' //vux移动UI库
Vue.component('icon', Icon)
Vue.component('x-button', XButton)
Vue.component('divider', Divider)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('sticky', Sticky)
Vue.component('view-box', ViewBox)
Vue.component('calendar', Calendar)
Vue.component('cell-box', CellBox)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('cell', Cell)
Vue.component('check-icon', CheckIcon)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('checklist', Checklist)
Vue.component('datetime-view', DatetimeView)
Vue.component('datetime-range', DatetimeRange)
Vue.component('datetime', Datetime)
Vue.component('form-preview', FormPreview)
Vue.component('group', Group)
Vue.component('inline-x-switch', InlineXSwitch)
Vue.component('inline-x-number', InlineXNumber)
Vue.component('inline-calendar', InlineCalendar)
Vue.component('popup-picker', PopupPicker)
Vue.component('popup-radio', PopupRadio)
Vue.component('picker', Picker)
Vue.component('rater', Rater)
Vue.component('radio', Radio)
Vue.component('range', Range)
Vue.component('selector', Selector)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)
Vue.component('search', Search)
Vue.component('x-switch', XSwitch)
Vue.component('x-input', XInput)
Vue.component('x-number', XNumber)
Vue.component('x-textarea', XTextarea)
Vue.component('x-address', XAddress)
Vue.component('badge', Badge)
Vue.component('card', Card)
Vue.component('clocker', Clocker)
Vue.component('countup', Countup) 
Vue.component('flow', Flow)
Vue.component('flow-state', FlowState)
Vue.component('flow-line', FlowLine)
Vue.component('marquee', Marquee)
Vue.component('marquee-item', MarqueeItem)
Vue.component('panel', Panel)
Vue.component('previewer', Previewer)
Vue.component('qrcode', Qrcode)
Vue.component('step', Step)
Vue.component('step-item', StepItem)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('x-table', XTable)
Vue.component('x-progress', XProgress)
Vue.component('x-img', XImg)
Vue.component('actionsheet', Actionsheet)
Vue.component('alert', Alert)
Vue.component('confirm', Confirm)
Vue.component('inline-loading', InlineLoading)
Vue.component('load-more', LoadMore)
Vue.component('loading', Loading)
Vue.component('msg', Msg)
Vue.component('popup', Popup)
Vue.component('popup-header', PopupHeader)
Vue.component('popover', Popover)
Vue.component('spinner', Spinner)
Vue.component('toast', Toast)
Vue.component('x-dialog', XDialog)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('drawer', Drawer)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-header', XHeader)
Vue.component('timeline', Timeline)
Vue.component('x-circle', XCircle)
Vue.component('blur', Blur)
Vue.component('countdown', Countdown)
Vue.component('color-picker', ColorPicker)
Vue.component('masker', Masker)
Vue.component('scroller', Scroller)
Vue.component('wechat-emotion', WechatEmotion)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)