import { useEffect, useState } from "react";
import { type TeamWithStreak, type PlayerWithStreak } from "@shared/schema";

interface StreakAlerts {
  newTeams: TeamWithStreak[];
  newPlayers: PlayerWithStreak[];
}

const STORAGE_KEY_TEAMS = 'elite-streaks-seen-teams';
const STORAGE_KEY_PLAYERS = 'elite-streaks-seen-players';

export function useStreakAlerts(
  teams: TeamWithStreak[],
  players: PlayerWithStreak[]
): StreakAlerts {
  const [newTeams, setNewTeams] = useState<TeamWithStreak[]>([]);
  const [newPlayers, setNewPlayers] = useState<PlayerWithStreak[]>([]);

  useEffect(() => {
    // Get previously seen team IDs from localStorage
    const seenTeamsStr = localStorage.getItem(STORAGE_KEY_TEAMS);
    const seenTeamIds = seenTeamsStr ? JSON.parse(seenTeamsStr) : [];
    
    // Find teams that weren't seen before
    const currentTeamIds = teams.map(t => t.id);
    const unseenTeams = teams.filter(team => !seenTeamIds.includes(team.id));
    
    // Update localStorage with current team IDs
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(currentTeamIds));
    
    // Only show alerts if we had previous data (not first load)
    if (seenTeamsStr && unseenTeams.length > 0) {
      setNewTeams(unseenTeams);
    }
  }, [teams]);

  useEffect(() => {
    // Get previously seen player IDs from localStorage
    const seenPlayersStr = localStorage.getItem(STORAGE_KEY_PLAYERS);
    const seenPlayerIds = seenPlayersStr ? JSON.parse(seenPlayersStr) : [];
    
    // Find players that weren't seen before
    const currentPlayerIds = players.map(p => p.id);
    const unseenPlayers = players.filter(player => !seenPlayerIds.includes(player.id));
    
    // Update localStorage with current player IDs
    localStorage.setItem(STORAGE_KEY_PLAYERS, JSON.stringify(currentPlayerIds));
    
    // Only show alerts if we had previous data (not first load)
    if (seenPlayersStr && unseenPlayers.length > 0) {
      setNewPlayers(unseenPlayers);
    }
  }, [players]);

  return { newTeams, newPlayers };
}

export function dismissTeamAlert(teamId: string, newTeams: TeamWithStreak[]): TeamWithStreak[] {
  return newTeams.filter(team => team.id !== teamId);
}

export function dismissPlayerAlert(playerId: string, newPlayers: PlayerWithStreak[]): PlayerWithStreak[] {
  return newPlayers.filter(player => player.id !== playerId);
}
