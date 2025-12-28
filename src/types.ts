export type Role = 'crewmate' | 'impostor';

export interface Player {
  id: string;
  name: string;
  role: Role;
  isAlive: boolean;
  votes: number;
}

export type GameMode = 'master' | 'no-master';

export interface GameConfig {
  totalPlayers: number;
  impostors: number;
  crewmates: number;
  playerNames?: string[]; // nombres personalizados de los jugadores
  famousName?: string; // nombre del famoso (en lugar de tripulante)
  category?: string; // categoría del juego
  gameMode?: GameMode; // modo de juego: con master o sin master
}

export type GamePhase = 'config' | 'assigning' | 'master-handoff' | 'playing' | 'voting' | 'results';

