import StreakBadge from '../StreakBadge';

export default function StreakBadgeExample() {
  return (
    <div className="flex gap-2">
      <StreakBadge result="W" />
      <StreakBadge result="D" />
      <StreakBadge result="L" />
    </div>
  );
}