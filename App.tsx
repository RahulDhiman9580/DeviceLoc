import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';

//router import
import MainRouterFile from './src/router';
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <MainRouterFile />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
