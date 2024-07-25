import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, TextProps } from 'react-native';
interface IProps {
  onSuccessCallback: Function,
  onFailedCallback: Function
}
const PassCode = ({ onSuccessCallback, onFailedCallback }: IProps, ref: any) => {
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [showValidate, setShowValidate] = useState<Boolean>(false);
  const refParams: any = useRef<String>('')
  useImperativeHandle(ref, () => ({
    setModalVisible,
    show
  }))
  const refPassCodeInput = useRef<String>('')
  const onPressJoin = () => {
    if (refParams.current?.passCode == refPassCodeInput.current && refPassCodeInput.current != '') {
      setShowValidate(false);
      setModalVisible(false)
      onSuccessCallback?.(refParams.current);
    }
    else {
      setShowValidate(true);
      onFailedCallback?.()
    }
  }
  const _onChangeText = (text: String) => {
    if (showValidate) {
      setShowValidate(false)
    }
    refPassCodeInput.current = text
  }
  const show = (data: any) => {
    setModalVisible(true)
    setShowValidate(false)
    refParams.current = data
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textPassCodeHeader}>PassCode</Text>
            <TextInput maxLength={4} secureTextEntry keyboardType='decimal-pad' placeholder='Enter the PassCode...' style={styles.inputPassCode} onChangeText={_onChangeText} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonJoin]}
                onPress={onPressJoin}>
                <Text style={styles.textStyle}>Join now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
            {showValidate && <Text style={styles.textIncorrectPassCode}>The pass code you entered is incorrect...!!!</Text>}
          </View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    width: 100,
    height: 40,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#f24',
  },
  buttonJoin: {
    backgroundColor: '#2196F3',
    marginRight: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputPassCode: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    height: 40,
    marginBottom: 20
  },
  textIncorrectPassCode: { fontSize: 9, fontWeight: 'bold', color: '#f24' },
  textPassCodeHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 }
});

export default React.forwardRef(PassCode);