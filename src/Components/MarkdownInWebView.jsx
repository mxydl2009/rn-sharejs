import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';
import Storage from '../utils/Storage';
import { useState, useEffect } from 'react';

function MarkdownInWebView ({id}) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  useEffect(() => {
    async function getToken () {
      const token = await Storage.get('token');
      setToken(token);
      setLoading(false);
    }
   getToken();
  }, [])
  return (
    <View style={{ flex: 1, paddingTop: 10, justifyContent: 'center' }}>
      {
        loading ? 
        <ActivityIndicator size="large" /> : 
        <WebView
          style={{ flex: 1, borderRadius: 8 }}
          // style={styles.webView}
          // originWhitelist={['*']}
          source={{
            uri: `https://sharejs.wiki/posts/native/${id}`,
            headers: {
              Cookie: `token=${token};`,
            },
          }}
      />
      }
    </View>
      
  )
}

export default MarkdownInWebView;