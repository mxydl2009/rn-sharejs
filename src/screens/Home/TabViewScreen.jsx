import { useEffect, useState, useRef }from 'react';
import { useWindowDimensions, FlatList, SafeAreaView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { useTheme, ActivityIndicator, Paragraph, Divider } from 'react-native-paper';
import Article from '../../Components/Article';
import { requestArticles } from '../../utils/request';
import EmptyComponent from '../../Components/Empty';

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

const AllRoute = (props) => {
  const { articles, handleEndReached, isLoading, total } = props;
  const renderFooter = () => {
    return (total <= articles.length && articles.length > 0) ? 
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
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={EmptyComponent}
      />
    </SafeAreaView>
  )
};

const ConcernRoute = (props) => {
  const { articles, handleEndReached, isLoading, total } = props;
  const renderFooter = () => {
    return (total <= articles.length && articles.length > 0) ? 
      <NoMoreData /> : 
      <ActivityIndicator animating={isLoading} />
  };
  return (
    <SafeAreaView>
      <FlatList
        data={articles}
        renderItem={({item}) => <Article {...item} />}
        keyExtractor={item => item._id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={EmptyComponent}
      />
    </SafeAreaView>
  )
};

const MyRoute = (props) => {
  const { articles, handleEndReached, isLoading, total } = props;
  const renderFooter = () => {
    return (total <= articles.length && articles.length > 0) ? 
      <NoMoreData /> : 
      <ActivityIndicator animating={isLoading} />
  };
  return (
    <SafeAreaView>
      <FlatList
        data={articles}
        renderItem={({item}) => <Article {...item} />}
        keyExtractor={item => item._id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={EmptyComponent}
      />
    </SafeAreaView>
  )
};

function TabViewScreen() {
  const user = useSelector(state => state.user)
  const layout = useWindowDimensions();
  const { colors } = useTheme();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'all', title: '全部文章' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [ articles, setArticles ] = useState([])
  const total = useRef(0);
  const pageDefault = 1;
  const pageSizeDefault = 8;
  const [ page, setPage ] = useState(pageDefault);

  useEffect(() => {
    if (user.username) {
      setRoutes([
        { key: 'all', title: '全部文章' },
        { key: 'concern', title: '我的关注' },
        { key: 'my', title: '我的文章' }
      ])
    } else {
      setRoutes([
        { key: 'all', title: '全部文章' }
      ])
    }
  }, [user.username])

  useEffect(() => {
    setIsLoading(true);
    requestArticles({
      currentPage: page,
      pageSize: pageSizeDefault,
      tag: '',
      userId: index === 2? user._id: undefined,
      concerns: index === 1? user.concerns: undefined
    }, {}, false).then((res) => {
      const { articles, totalCount } = res.data;

      total.current = totalCount;
      setArticles((preData) => [ ...preData, ...articles ])
      setIsLoading(false);
    })
  }, [page, index])

  const handleIndexChange = (index) => {
    setIndex(index);
    setPage(1);
    setArticles([]);
    setIsLoading(false);
  }

  const handleEndReached = () => {
    console.log('end reached',  total.current, page * pageSizeDefault);
    if (total.current > page * pageSizeDefault) {
      // console.log('end reached', total, page * pageSizeDefault);
      setPage((prePage) => prePage + 1)
    }
  }

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return <AllRoute articles={articles} handleEndReached={handleEndReached} isLoading={isLoading} total={total.current} />
      case 'concern':
        return <ConcernRoute articles={articles} handleEndReached={handleEndReached} isLoading={isLoading} total={total.current} />
      case 'my':
        return <MyRoute articles={articles} handleEndReached={handleEndReached} isLoading={isLoading} total={total.current} />
      default:
        return <AllRoute article={article} />
    }
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={[{backgroundColor: 'transparent', display: 'flex', justifyContent: 'flex-start'}]}
      activeColor={colors.primary}
      inactiveColor='gray'
      labelStyle={[{fontSize: 14}]}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

export default TabViewScreen;