import { useDispatch } from 'react-redux';
import { signup } from '../../store/login/actions';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Headline, Text, Button, TextInput, Snackbar } from 'react-native-paper';

import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
  .string('请输入有效邮箱')
  .required('邮箱必需'),
  username: yup
    .string('请输入用户名')
    .min(3, '请输入不少于3个字符的用户名')
    .required('用户名必需'),
  password: yup
    .string('请输入密码')
    .min(6, '请输入不少于6个字符的密码')
    .required('密码必需'),
  repeatedPassword: yup
    .string('请再次输入相同的密码')
    .min(6, '请输入不少于6个字符的密码')
    .required('密码必需'),
});

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    paddingHorizontal: 30,
    width: '100%',
    flex: 1,
    paddingVertical: 40
  },
  title: {
    paddingBottom: 30
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
    rowGap: 40,
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

function Signup () {
  const [ secureInput, setSecureInput] = useState(true);
  const dispatch = useDispatch();
  // // 响应或者校验的提示信息
  const [ feedbackContent, setFeedbackContent ] = useState('');

  const handleSubmit = (values) => {
    console.log('values', values);
    if (values.password !== values.repeatedPassword) {
      return setFeedbackContent('密码不一致');
    }
    console.log('password', values.password);
    return dispatch(signup({
      ...values,
      avatar: ''
    }))
      .then(res => {
        console.log('signup success', res);
        setFeedbackContent('signup success');
      }).catch(err => {
        console.log('signup fail', err);
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
            注册账号
          </Headline>
        </View>
      </View>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          repeatedPassword: ''
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values,
          errors, isValid }) => (
        <View style={styles.formContent}>
          <View style={styles.formItem}>
            <TextInput
              label="邮箱"
              name="email"
              placeholder=""
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {errors.email &&
              <Text style={styles.validateText}>{errors.email}</Text>
            }
          </View>
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
          <View style={styles.formItem}>
            <TextInput
              label="确认密码"
              name="repeatedPassword"
              secureTextEntry={secureInput}
              placeholder=""
              value={values.repeatedPassword}
              onChangeText={handleChange('repeatedPassword')}
              right={
                <TextInput.Icon name="eye" onPress={toggleSecureInput} />
              }
            />
            {errors.repeatedPassword &&
              <Text style={styles.validateText}>{errors.repeatedPassword}</Text>
            }
          </View>
          <Button mode="contained" 
            style={styles.submitBtn}
            labelStyle={styles.btnLabel}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            注册
          </Button>
        </View>
        )}
      </Formik>
      <Snackbar 
        visible={feedbackContent !== ''} duration={2000}
        onDismiss={handleFeedbackContentClose}
      >
        { feedbackContent }
      </Snackbar>
    </View>
  )
}

export default Signup;