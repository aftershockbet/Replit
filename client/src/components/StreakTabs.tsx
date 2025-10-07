import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Equal } from "lucide-react";
import { type StreakType } from "@shared/schema";
import goalscorerIcon from "@/assets/goalscorer-icon.jpeg";

interface StreakTabsProps {
  activeTab: StreakType;
  onTabChange: (tab: StreakType) => void;
  winningCount: number;
  drawingCount: number;
  goalscorersCount: number;
  children: React.ReactNode;
  className?: string;
}

export default function StreakTabs({ 
  activeTab, 
  onTabChange, 
  winningCount, 
  drawingCount, 
  goalscorersCount, 
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
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger 
          value="winning" 
          className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-[#40af0f] data-[state=active]:text-white"
          data-testid="tab-winning-streaks"
        >
          <Trophy className="h-4 w-4" />
          <span className="hidden sm:inline">Winning Streaks</span>
          <span className="sm:hidden text-xs">Win</span>
          <Badge variant="secondary" className="ml-1">
            {winningCount}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="drawing" 
          className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-[#efb609] data-[state=active]:text-white"
          data-testid="tab-drawing-streaks"
        >
          <Equal className="h-4 w-4" />
          <span className="hidden sm:inline">Drawing Streaks</span>
          <span className="sm:hidden text-xs">Draw</span>
          <Badge variant="secondary" className="ml-1">
            {drawingCount}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="goalscorers" 
          className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-[#c60000] data-[state=active]:text-white"
          data-testid="tab-goalscorers-streaks"
        >
          <img src={goalscorerIcon} alt="Goalscorer" className="h-4 w-4 object-contain" />
          <span className="hidden sm:inline">Goalscorers</span>
          <span className="sm:hidden text-xs">Goals</span>
          <Badge variant="secondary" className="ml-1">
            {goalscorersCount}
          </Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="winning" className="mt-6">
        {children}
      </TabsContent>
      
      <TabsContent value="drawing" className="mt-6">
        {children}
      </TabsContent>
      
      <TabsContent value="goalscorers" className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}