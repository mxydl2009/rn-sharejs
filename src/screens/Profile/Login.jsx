import { useDispatch } from 'react-redux';
import { login } from '../../store/login/actions';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Headline, Text, Button, TextInput, Snackbar, TouchableRipple } from 'react-native-paper';

import { Formik } from 'formik';
import * as yup from 'yup';
import encrypt from '../../utils/encrypt';

const validationSchema = yup.object({
  username: yup
    .string('请输入用户名')
    .min(3, '请输入不少于3个字符的用户名')
    .required('用户名必需'),
  password: yup
    .string('请输入密码')
    .min(6, '请输入不少于6个字符的密码')
    .required('密码必需'),
});

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    paddingHorizontal: 30,
    width: '100%',
    flex: 1,
    paddingVertical: 60
  },
  title: {
    paddingBottom: 60
  },
  stack: {
    display: 'flex',
    rowGap: 10
  },
  signLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  formContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    rowGap: 60,
  },
  formItem: {
    position: 'relative'
  },
  validateText: {
    fontSize: 14, 
    color: 'red',
    position: 'absolute',
    bottom: -30
  },
  submitBtn: {
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // 按钮的可点击区域由label文本元素的大小来确定，所以这里设置了宽度
  btnLabel: {
    fontSize: 18,
    width: '100%'
  }
})

function Login ({ navigation }) {
  const [ secureInput, setSecureInput] = useState(true);
  const dispatch = useDispatch();
  // // 响应或者校验的提示信息
  const [ feedbackContent, setFeedbackContent ] = useState('');

  const handleSubmit = (values) => {
    const password = encrypt(values.password);
    console.log('password', password);
    return dispatch(login({
      ...values,
      password
    }))
      .then(res => {
        console.log('login success', res);
        setFeedbackContent('login success');
      }).catch(err => {
        console.log('login fail', err);
        setFeedbackContent(err.message)
      })
  }

  const handleFeedbackContentClose = () => {
    setFeedbackContent('');
  };

  const toggleSecureInput = () => {
    setSecureInput(!secureInput);
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.stack}>
          <Headline>
            请登录您的账号
          </Headline>
          <View style={styles.signLink}>
            <Text>没有账号？点此</Text>
            <Button mode="text" 
              onPress={() => navigation.navigate('Signup')} 
              compact 
              style={{ color: '#1976d2', marginHorizontal: 0 }}>
              注册
            </Button>
          </View>
        </View>
      </View>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values,
          errors, isValid }) => (
          <View style={styles.formContent}>
            <View style={styles.formItem}>
              <TextInput
                label="用户名"
                name="username"
                placeholder=""
                value={values.username}
                onChangeText={handleChange('username')}
              />
              {errors.username &&
                <Text style={styles.validateText}>{errors.username}</Text>
              }
            </View>
            <View style={styles.formItem}>
              <TextInput
                label="密码"
                name="password"
                secureTextEntry={secureInput}
                placeholder=""
                value={values.password}
                onChangeText={handleChange('password')}
                right={
                  <TextInput.Icon name="eye" onPress={toggleSecureInput} />
                }
              />
              {errors.password &&
                <Text style={styles.validateText}>{errors.password}</Text>
              }
            </View>
            <Button mode="contained" 
              style={styles.submitBtn}
              labelStyle={styles.btnLabel}
              onPress={handleSubmit}
              disabled={!isValid}
            >登录</Button>
          </View>
        )}
      </Formik>
      <Snackbar visible={feedbackContent !== ''} duration={2000}
          onDismiss={handleFeedbackContentClose}>
            { feedbackContent }
      </Snackbar>
    </View>
  )
}

export default Login;