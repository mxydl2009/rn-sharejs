import { View, SafeAreaView, ScrollView } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabViewScreen from './TabViewScreen';
import ArticleDetailScreen from './ArticleDetailScreen';

const Stack = createNativeStackNavigator();

function HomeScreen() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={TabViewScreen}
        options={{ title: '文章列表' }}
      />
      <Stack.Screen 
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{ title: '文章详情' }} />
    </Stack.Navigator>
  );
}

export default HomeScreen;