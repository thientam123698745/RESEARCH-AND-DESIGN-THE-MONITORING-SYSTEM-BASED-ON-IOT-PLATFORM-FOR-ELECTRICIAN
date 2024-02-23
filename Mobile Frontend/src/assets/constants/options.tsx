import {Image, StyleProp, StyleSheet, Text, View} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '.';
import React from 'react';
import {Images} from '@assets/constants/images';
import {Options} from 'src/types/Options';
import LinearGradient from 'react-native-linear-gradient';
import {linear_gradient} from '@assets/colors';
import MetricSizes from '@assets/constants/MetricSizes';
// import {colors} from '@assets/colors';
const return_list = {
  return_illustration: Images.ARROW_SPLASH_SCREEN,
  return_signUp: Images.CARET_RIGHT,
};
const bigLogoHeader = () => (
  <View style={styles.wrapper}>
    <Image source={Images.LOGO} style={styles.logoImage} />
  </View>
);
const smallLogoHeader = () => (
  <View style={styles.small_wrapper}>
    <Image source={Images.LOGO} style={styles.smallLogoImage} />
  </View>
);
const smallTitleHeader = () => (
  <LinearGradient
    colors={linear_gradient.labelHeader}
    style={styles.wrapper_label}>
    <Text style={styles.text}>Title</Text>
  </LinearGradient>
);

const headerWrapper: StyleProp<any> = {
  // backgroundColor: colors.primary,
};
export const options: Options = {
  HIDE_HEADER: {headerShown: false},
  HIDE_LABEL: {
    headerTransparent: true,
    title: '',
  },
  SHOW_HEADER: {
    headerShadowVisible: false,
    headerTitle: smallLogoHeader,
    headerTitleAlign: 'center',
    headerStyle: headerWrapper,
    headerBackImageSource: return_list.return_signUp,
  },
  SHOW_HEADER_WITHOUT_RETURN: {
    headerShadowVisible: false,
    headerTitle: bigLogoHeader,
    headerTitleAlign: 'center',
    headerBackVisible: false,
    headerStyle: headerWrapper,
  },
  SHOW_LABEL: {
    header: smallTitleHeader,
    // headerShown: false,
  },
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: WINDOW_HEIGHT * 0.1,
  },
  wrapper_label: {
    height: WINDOW_HEIGHT * 0.12,
    // borderWidth: 1,
    borderBottomLeftRadius: MetricSizes.P_20,
    borderBottomRightRadius: MetricSizes.P_20,
  },
  text: {},
  logoImage: {
    width: WINDOW_WIDTH * 0.6,
    height: undefined,
    aspectRatio: 5 / 1,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  smallLogoImage: {
    width: WINDOW_WIDTH * 0.5,
    height: undefined,
    aspectRatio: 5 / 1,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  small_wrapper: {},
});
