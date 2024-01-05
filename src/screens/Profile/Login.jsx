// import Typography from "@mui/material/Typography";
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import styles from './Login.module.scss';
// import Link from 'next/link';
// import { TextField, Tooltip, Snackbar, Alert } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { login } from '../../store/login/actions';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Headline, Text, Button, TextInput, Snackbar } from 'react-native-paper';

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
    // flex: 1
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

function LoginScreen () {
  // const router = useRouter();
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
        // console.log(router.query);
        // router.replace(router.query.redirectUrl || '/')
      }).catch(err => {
        console.log('login fail', err);
        setFeedbackContent(err.message)
      })
  }

  const handleFeedbackContentClose = () => {
    setFeedbackContent('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.stack}>
          <Headline>
            请登录您的账号
          </Headline>
          <View style={styles.signLink}>
            <Text>没有账号？点此</Text>
            <Button mode="text" compact style={{ color: '#1976d2', marginHorizontal: 0 }}>注册</Button>
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
        {({ handleChange, handleBlur, handleSubmit, values,
          errors, isValid }) => (
          <View style={styles.formContent}>
            <View style={styles.formItem}>
              <TextInput
                label="用户名"
                name="username"
                placeholder="请输入用户名"
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
                secureTextEntry
                placeholder="请输入密码"
                value={values.password}
                onChangeText={handleChange('password')}
                right={
                  <TextInput.Icon name="eye" />
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

export default LoginScreen;