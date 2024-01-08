import { useEffect, useState }from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import ViewFactory from '../../Components/ViewFactory';
const AllRouteCom = ViewFactory();
const ConcernRouteCom = ViewFactory();
const MyRouteCom = ViewFactory();
const AllRoute = (props) => (
  <AllRouteCom {...props} />
);

const ConcernRoute = (props) => (
  <ConcernRouteCom {...props} />
);;

const MyRoute = (props) => (
  <MyRouteCom {...props} />
);

function TabViewScreen() {
  const user = useSelector(state => state.user)
  const layout = useWindowDimensions();
  const { colors } = useTheme();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'all', title: '全部文章' }
  ]);

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

  const handleIndexChange = (index) => {
    setIndex(index);
  }

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return <AllRoute index={0} />
      case 'concern':
        return <ConcernRoute index={1} />
      case 'my':
        return <MyRoute index={2} />
      default:
        return <AllRoute index={0} />
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