
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthorInfo from './AuthorInfo';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Chip, useTheme } from 'react-native-paper';
// import Markdown from 'react-native-markdown-display';
import { useNavigation } from '@react-navigation/native';

import { requestLoveArticle, requestViewArticle } from '../utils/request';
import MarkdownInWebView from './MarkdownInWebView';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1,
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    justifyContent: 'space-between',
  },
  articleTitle: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10
  },
  operation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40
  },
  operate: {
    display: 'flex',
    flexDirection: 'row'
  },
  operateItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 6,
    justifyContent: 'flex-start',
  },
  chip: {
    paddingHorizontal: 0,
    marginHorizontal: 0
  },
  content: {
    flex: 1,
  },
  // markdownStyle: {
  //   body: { fontFamily: 'Arial', fontSize: 16, color: '#333' },
  //   heading1: { fontSize: 24, color: '#4CAF50', paddingVertical: 8 },
  //   heading2: { fontSize: 20, color: '#2196F3', paddingVertical: 6 },
  //   heading3: { fontSize: 18, color: '#795548', paddingVertical: 6 },
  //   heading4: { fontSize: 16, color: '#FF9800', paddingVertical: 4 },
  //   heading5: { fontSize: 14, color: '#F44336', paddingVertical: 4 },
  //   heading6: { fontSize: 12, color: '#9E9E9E', paddingVertical: 2 },
  //   paragraph: { marginVertical: 8,},
  //   list: { marginVertical: 8, },
  //   listItem: { flexDirection: 'row', },
  //   bulletItemText: { marginLeft: 8 },
  //   strong: { fontWeight: 'bold' },
  //   em: { fontStyle: 'italic' },
  //   link: { color: '#2196F3' },
  //   table: { marginVertical: 8 },
  //   tableHeader: { fontWeight: 'bold', backgroundColor: '#f2f2f2' },
  //   tableRow: { borderBottomWidth: 1, borderColor: '#ccc' },
  //   tableColumn: { padding: 8 },
  //   tableWrapper: { overflowX: 'scroll' },
  //   code_inline: { backgroundColor: '#eee', padding: 4, borderRadius: 4 },
  //   code_block: { backgroundColor: '#eee', padding: 8, borderRadius: 6 },
  // }
})

export default function Article(props) {
  const {
    _id,
    title,
    onlyAuthor,
    date,
    excerpts,
    content,
    tags = [],
    author = {},
    initLoves = [],
  } = props;
  const { colors } = useTheme();
  const [ loves, setLoves ] = useState(initLoves);
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const navToRead = () => {
    navigation.navigate('ArticleDetail', {
      articleId: _id
    });
    // 统计被点击的次数
    requestViewArticle({
      articleId: _id
    }).finally(() => {
      console.log('clicked')
    })
  }

  const handleArticleLoves = () => {
    requestLoveArticle({
      articleId: _id,
      userId: user._id
    }).then(res => {
      console.log('loves success: ', res)
      if (res.success) {
        setLoves(res.data.loves);
      }
    }).catch(err => {
      console.log('concern err: ', err)
    })
  }

  return _id ? 
    (
      <View style={styles.container}>
        <View style={styles.meta}>
          <View style={[styles.authorInfo]}>
            { author._id && <AuthorInfo author={author} date={date}  /> }
            { (user._id !== author._id && user.username) && 
            
              <Button 
                mode="contained"
                icon="heart"
                onPress={handleArticleLoves}
                contentStyle={{ marginLeft: 0 }}
                labelStyle={{ marginVertical: 6, }}
              >
                { loves.length } 
              </Button>
            }
          </View>
          <View style={[styles.articleTitle]}>
            <TouchableOpacity 
              onPress={navToRead}
              style={{ flex: 3 }}
            >
              <Text
                style={{ fontSize: 15, lineHeight: 24, color: colors.primary }}
              >
                {title}
              </Text>
            </TouchableOpacity>
            {
              onlyAuthor && 
              <Chip
                mode="outlined"
                style={[styles.chip, 
                  { height: 22, maxWidth: 70, flex: 1, backgroundColor: colors.primary }
                ]}
                textStyle={{ 
                  minHeight: 20,
                  lineHeight: 20, 
                  fontSize: 11, 
                  color: 'white', 
                  marginVertical: 0, 
                  marginLeft: 2, 
                  marginRight: 2 
                }}
              >
                  仅作者可见
              </Chip>
            }
          </View>
          
        </View>
        {
          !content &&  
          (
            <View style={[styles.excerpts]}>
              <Text style={{color: 'gray', fontSize: 13, lineHeight: 20}}>{excerpts}</Text>
            </View>
          )
        }
        <View style={[styles.operation]}>
          <View style={[styles.operate]}>
            <Button 
              icon="page-next"
              style={[styles.operateItem]} 
              uppercase={false} 
              labelStyle={{ fontSize: 13, marginLeft: 0, marginRight: 6 }}
              contentStyle={{ flexDirection: 'row-reverse'}}
              onPress={navToRead}>
              阅读
            </Button>
          </View>
          <View style={styles.tags}>
            {
              tags.map(tag => (
                <Chip 
                  style={[styles.chip, { backgroundColor: colors.primary }]} 
                  textStyle={{ 
                    minHeight: 20,
                    lineHeight: 20, 
                    fontSize: 11, 
                    color: 'white', 
                    marginVertical: 0, 
                    marginLeft: 2, 
                    marginRight: 2 
                  }}
                  key={tag}>
                  {tag}
                </Chip>
              ))
            }
          </View>
        </View>
          {
            content &&
            <View
              style={[styles.content]}
            >
              <MarkdownInWebView id={_id} />
            </View>
          }
      </View>
    )
    : null
}