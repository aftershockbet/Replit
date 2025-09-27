import { useState } from 'react';
import StreakTabs from '../StreakTabs';
import { type StreakType } from '@shared/schema';

export default function StreakTabsExample() {
  const [activeTab, setActiveTab] = useState<StreakType>('winning');

  return (
    <div className="w-full max-w-2xl">
      <StreakTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        winningCount={12}
        drawingCount={8}
      >
        <div className="text-center py-8 text-muted-foreground">
          Content for {activeTab} streaks would appear here
        </div>
      </StreakTabs>
    </div>
  );
}