import { StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import Home from './pages/home';
import { colors, h } from './components/style';

export default function App() {
  return (
    <NativeRouter future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true 
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </NativeRouter>
  );
}



