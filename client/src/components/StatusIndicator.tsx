import { Badge } from "@/components/ui/badge";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { format } from "date-fns";

interface StatusIndicatorProps {
  lastUpdated: Date;
  isOnline?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function StatusIndicator({ 
  lastUpdated, 
  isOnline = true, 
  isLoading = false, 
  className 
}: StatusIndicatorProps) {
  const formatLastUpdated = (date: Date) => {
    return format(date, 'MMM d, HH:mm');
  };

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center gap-1">
        {isOnline ? (
          <Wifi className="h-4 w-4" data-testid="icon-online" />
        ) : (
          <WifiOff className="h-4 w-4" data-testid="icon-offline" />
        )}
      </div>
      
      {/* Loading Indicator */}
      {isLoading && (
        <RefreshCw className="h-4 w-4 animate-spin" data-testid="icon-loading" />
      )}
      
      {/* Last Updated */}
      <span data-testid="text-last-updated">
        Updated: {formatLastUpdated(lastUpdated)}
      </span>
      
      {/* Status Badge */}
      <Badge 
        variant={isOnline ? 'default' : 'secondary'}
        className="text-xs"
        data-testid="badge-status"
      >
        {isLoading ? 'Updating...' : isOnline ? 'Live' : 'Offline'}
      </Badge>
    </div>
  );
}