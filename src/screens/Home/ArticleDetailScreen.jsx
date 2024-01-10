import { SafeAreaView, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import Article from "../../Components/Article";
import { requestArticleById } from '../../utils/request';
import { useSelector } from "react-redux";

function ArticleDetailScreen (props) {
  const [ articleDetail, setArticleDetail ] = useState({});
  const user = useSelector((state) => state.user);
  const route = useRoute();
  useEffect(() => {
    if (route.params && route.params.articleId) {
      requestArticleById(route.params.articleId, user._id)
        .then(res => {
          const { article } = res.data;
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
    <SafeAreaView style={[{flex: 1}]}>
      <View style={[{flex: 1}]}>
        <Article {...articleDetail} />
      </View>
    </SafeAreaView>
  )
}

export default ArticleDetailScreen;