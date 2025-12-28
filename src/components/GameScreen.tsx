import { useState } from 'react';
import type { Player, GameConfig } from '../types';
import VotingScreen from './VotingScreen';
import './GameScreen.css';

interface GameScreenProps {
  players: Player[];
  config: GameConfig;
  onGameEnd: (winner: 'crewmate' | 'impostor', updatedPlayers: Player[]) => void;
  onBackToConfig: () => void;
}

export default function GameScreen({ players, config, onGameEnd, onBackToConfig }: GameScreenProps) {
  const [gamePlayers, setGamePlayers] = useState<Player[]>(players);
  const [phase, setPhase] = useState<'playing' | 'voting'>('playing');

  const handleVoteComplete = (votedOut: Player | null) => {
    let updatedPlayers = gamePlayers;
    
    if (votedOut) {
      updatedPlayers = gamePlayers.map(p =>
        p.id === votedOut.id ? { ...p, isAlive: false } : p
      );
      setGamePlayers(updatedPlayers);
    }

    // Verificar condiciones de victoria con los jugadores actualizados
    const aliveImpostors = updatedPlayers.filter(p => p.isAlive && p.role === 'impostor');
    const aliveCrewmates = updatedPlayers.filter(p => p.isAlive && p.role === 'crewmate');

    if (aliveImpostors.length === 0) {
      onGameEnd('crewmate', updatedPlayers);
    } else if (aliveImpostors.length >= aliveCrewmates.length) {
      onGameEnd('impostor', updatedPlayers);
    } else {
      // Continuar el juego
      setPhase('playing');
    }
  };

  const handleStartVoting = () => {
    setPhase('voting');
  };

  if (phase === 'voting') {
    return (
      <VotingScreen
        players={gamePlayers}
        onVoteComplete={handleVoteComplete}
      />
    );
  }

  const alivePlayers = gamePlayers.filter(p => p.isAlive);
  const deadPlayers = gamePlayers.filter(p => !p.isAlive);
  const aliveCrewmates = gamePlayers.filter(p => p.isAlive && p.role === 'crewmate');

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="back-button" onClick={onBackToConfig}>
          ← Configuración
        </button>
        <h2>Partida en Curso</h2>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Vivos</span>
            <span className="stat-value">{alivePlayers.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{config.famousName || 'Famosos'}</span>
            <span className="stat-value crewmate">{aliveCrewmates.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Impostores</span>
            <span className="stat-value impostor">?</span>
          </div>
        </div>
      </div>

      <div className="discussion-phase">
        <div className="discussion-instructions">
          <h3>Fase de Discusión</h3>
          <p>Discutan sobre lo que ha sucedido y prepárense para votar.</p>
        </div>
        <div className="discussion-controls">
          <button className="control-button start-voting-button" onClick={handleStartVoting}>
            Iniciar Votación
          </button>
        </div>

        <div className="players-list">
          <h4>Jugadores Vivos ({alivePlayers.length})</h4>
          <div className="players-grid">
            {alivePlayers.map(player => (
              <div key={player.id} className="player-card">
                <div className="player-avatar">
                  {config.gameMode === 'no-master' ? '👤' : (player.role === 'impostor' ? '👹' : '👨‍🚀')}
                </div>
                <div className="player-name">{player.name}</div>
                <div className="player-status alive">Vivo</div>
              </div>
            ))}
          </div>
          {deadPlayers.length > 0 && (
            <>
              <h4 className="dead-players-title">Jugadores Eliminados ({deadPlayers.length})</h4>
              <div className="players-grid">
                {deadPlayers.map(player => (
                  <div key={player.id} className="player-card disabled">
                    <div className="player-avatar">
                      {config.gameMode === 'no-master' ? '👤' : (player.role === 'impostor' ? '👹' : '👨‍🚀')}
                    </div>
                    <div className="player-name">{player.name}</div>
                    <div className="player-status dead">Eliminado</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

