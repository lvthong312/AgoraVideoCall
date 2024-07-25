import React from 'react';
import { StyleSheet } from 'react-native';
interface IProps {
  navigation: any;
  route: {
    params: any;
  };
}
const withNavigation = (Component: any) => (props: IProps) => {
  return (
    <Component
      {...props}
      params={null}
      navigation={props?.navigation}
      {...props?.route?.params}
    />
  );
};

const styles = StyleSheet.create({});

export default withNavigation;
