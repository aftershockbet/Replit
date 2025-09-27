import StatusIndicator from '../StatusIndicator';

export default function StatusIndicatorExample() {
  const lastUpdated = new Date();

  return (
    <div className="space-y-4">
      <StatusIndicator lastUpdated={lastUpdated} isOnline={true} />
      <StatusIndicator lastUpdated={lastUpdated} isOnline={true} isLoading={true} />
      <StatusIndicator lastUpdated={lastUpdated} isOnline={false} />
    </div>
  );
}