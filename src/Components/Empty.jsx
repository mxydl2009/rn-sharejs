import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  emptyText: {
    fontSize: 20,
    color: '#000',
  },
});
const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No data available</Text>
  </View>
);

export default EmptyComponent;