import { useEffect, useState, useRef }from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ActivityIndicator, Paragraph, Divider } from 'react-native-paper';
import Article from './Article';
import EmptyComponent from './Empty';
import { useSelector } from 'react-redux';
import { requestArticles } from '../utils/request';
const NoMoreData = ({text}) => {
  return (
    <Paragraph  style={{ 
      textAlign: 'center',
      color: 'gray',
      marginVertical: 20
    }}>
      {text || '没有更多数据了' }
    </Paragraph>
  )
}

 function ViewFactory () {
  return function (props) {
    const { index } = props;
    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false);
  
    const [ articles, setArticles ] = useState([]);
    const total = useRef(0);
    const pageDefault = 1;
    const pageSizeDefault = 8;
    const [ page, setPage ] = useState(pageDefault);
    useEffect(() => {
      setIsLoading(true);
      requestArticles({
        currentPage: page,
        pageSize: pageSizeDefault,
        tag: '',
        userId: index === 2? user._id: undefined,
        concerns: index === 1? user.concerns: undefined
      }, {}, false)
      .then((res) => {
        const { articles, totalCount } = res.data;
  
        total.current = totalCount;
        if (page === 1) {
          setArticles([...articles]);
        } else {
          setArticles((preData) => [ ...preData, ...articles ])
        }
        setIsLoading(false);
      })
    }, [page, index])
    const handleEndReached = () => {
      if (total.current > page * pageSizeDefault) {
        setPage((prePage) => prePage + 1)
      }
    }
    const handleRefresh = () => {
      setPage(1);
    }
    const renderFooter = () => {
      return (total.current <= articles.length && articles.length > 0) ? 
        <NoMoreData /> : 
        <ActivityIndicator animating={isLoading} />
    };
    return (
      <SafeAreaView>
        <FlatList
          data={articles}
          renderItem={({item}) => <Article {...item} />}
          ItemSeparatorComponent={() => <Divider style={{height: 0.5}}/>}
          keyExtractor={item => item._id}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={EmptyComponent}
        />
      </SafeAreaView>
    )
  }
 }

export default ViewFactory;