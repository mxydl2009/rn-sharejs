import { SafeAreaView, ScrollView, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import Article from "../../Components/Article";
import { requestArticleById } from '../../utils/request';

function ArticleDetailScreen (props) {
  const [ articleDetail, setArticleDetail ] = useState({});
  const route = useRoute();
  useEffect(() => {
    if (route.params && route.params.articleId) {
      requestArticleById(route.params.articleId)
        .then(res => {
          const { article } = res.data;
          console.log('article detail author', article.author)
          setArticleDetail({
            ...article
          });
        })
        .catch(err => {
          console.log(`requestArticleById ${route.params.articleId} err: `, err)
        })
    }
  }, [route.params])
  return (
    <SafeAreaView>
      <ScrollView>
        <Article {...articleDetail} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ArticleDetailScreen;