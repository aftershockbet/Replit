import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Minus } from "lucide-react";
import { type StreakType } from "@shared/schema";

interface StreakTabsProps {
  activeTab: StreakType;
  onTabChange: (tab: StreakType) => void;
  winningCount: number;
  drawingCount: number;
  children: React.ReactNode;
  className?: string;
}

export default function StreakTabs({ 
  activeTab, 
  onTabChange, 
  winningCount, 
  drawingCount, 
  children, 
  className 
}: StreakTabsProps) {
  const handleTabChange = (value: string) => {
    const tabType = value as StreakType;
    onTabChange(tabType);
    console.log('Tab changed to:', tabType); // todo: remove mock functionality
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className={className}
      data-testid="tabs-streak-types"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger 
          value="winning" 
          className="flex items-center gap-2 data-[state=active]:bg-[#40af0f] data-[state=active]:text-white dark:data-[state=active]:bg-green-600/20 dark:data-[state=active]:text-green-400 dark:data-[state=active]:border-green-500/30"
          data-testid="tab-winning-streaks"
        >
          <Trophy className="h-4 w-4" />
          <span>Winning Streaks</span>
          <Badge variant="secondary" className="ml-1">
            {winningCount}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="drawing" 
          className="flex items-center gap-2 data-[state=active]:bg-[#efb609] data-[state=active]:text-white dark:data-[state=active]:bg-amber-600/20 dark:data-[state=active]:text-amber-400 dark:data-[state=active]:border-amber-500/30"
          data-testid="tab-drawing-streaks"
        >
          <Minus className="h-4 w-4" />
          <span>Drawing Streaks</span>
          <Badge variant="secondary" className="ml-1">
            {drawingCount}
          </Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="winning" className="mt-6">
        {children}
      </TabsContent>
      
      <TabsContent value="drawing" className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}