import {Dimensions} from 'react-native';

// width and height
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const API_SERVER = 'https://365truck.fdssoft.com/api';

export const OTP_CODE = '123456';

export const STATUS_TRUCK = {
  BUY: 0,
  SELL: 1,
  ADS: 2,
};
export const NOTIFICATION_TYPE = {
  AUTH: 1,
  PROFILE: 2,
  ORDER: 3,
  TRUCKS: 4,
};
export const NOTIFICATION_KIND = {
  NULL: -1,
  COMING_SOON: 0,
  LOGIN_FAILED: 1,
  ERROR: 2,
  SUCCESS: 3,
};

export const GOOGLE_API = 'AIzaSyB7tdC3bG6qJ4DzrhLQa3MV-rzwxdcJ3P4';
export const NOT_VALID_DATE = new Date(1900, 1, 1);
export const MONTHS = [
  {
    id: 0,
    abbreviation: 'Jan',
    name: 'January',
    isActive: true,
  },
  {
    id: 1,
    abbreviation: 'Feb',
    name: 'February',
    isActive: false,
  },
  {
    id: 2,
    abbreviation: 'Mar',
    name: 'March',
    isActive: false,
  },
  {
    id: 3,
    abbreviation: 'Apr',
    name: 'April',
    isActive: false,
  },
  {
    id: 4,
    abbreviation: 'May',
    name: 'May',
    isActive: false,
  },
  {
    id: 5,
    abbreviation: 'Jun',
    name: 'June',
    isActive: false,
  },
  {
    id: 6,
    abbreviation: 'Jul',
    name: 'July',
    isActive: false,
  },
  {
    id: 7,
    abbreviation: 'Aug',
    name: 'August',
    isActive: false,
  },
  {
    id: 8,
    abbreviation: 'Sep',
    name: 'September',
    isActive: false,
  },
  {
    id: 9,
    abbreviation: 'Oct',
    name: 'October',
    isActive: false,
  },
  {
    id: 10,
    abbreviation: 'Nov',
    name: 'November',
    isActive: false,
  },
  {
    id: 11,
    abbreviation: 'Dec',
    name: 'December',
    isActive: false,
  },
];

export const LOGIN_METHOD = {
  NORMAL: 0,
  FACEBOOK: 1,
  GOOGLE: 2,
};

export const REGEX_LIST = {
  FULL_NAME:
    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
  PHONE: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NICKNAME: /^[a-zA-Z0-9_.]*$/,
  OTP_CODE: /^\d{6}$/,
};

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};
