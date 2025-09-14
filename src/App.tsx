import React, { useEffect } from 'react';
import TopBar from './components/TopBar/TopBar';
import SlidesPanel from './components/Sidebar/SlidesPanel';
import CanvasStage from './components/CanvasStage/CanvasStage';
import BottomBar from './components/Mobile/BottomBar';
import Toasts from './components/Chrome/Toasts';
import { useCarouselStore } from './store/useCarouselStore';

const App: React.FC = () => {
  const load = useCarouselStore((s) => s.loadFromStorage);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-off-white">
      <SlidesPanel />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <CanvasStage />
        <BottomBar />
      </div>
      <Toasts />
    </div>
  );
};

export default App;
