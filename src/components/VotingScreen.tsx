import { useState } from 'react';
import type { Player } from '../types';
import './VotingScreen.css';

interface VotingScreenProps {
  players: Player[];
  onVoteComplete: (votedOut: Player | null) => void;
}

export default function VotingScreen({ players, onVoteComplete }: VotingScreenProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const alivePlayers = players.filter(p => p.isAlive);
  const deadPlayers = players.filter(p => !p.isAlive);

  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  const handleConfirmElimination = () => {
    if (selectedPlayer) {
      const playerToEliminate = players.find(p => p.id === selectedPlayer);
      if (playerToEliminate) {
        onVoteComplete(playerToEliminate);
      }
    }
  };

  const handleCancel = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="voting-screen">
      <div className="voting-header">
        <h2>Eliminación</h2>
        <p className="voting-subtitle">Selecciona al jugador a eliminar</p>
      </div>

      <div className="voting-content">
        <div className="players-section">
          <h3 className="section-title">Jugadores Vivos</h3>
          <div className="voting-options">
            {alivePlayers.map(player => (
              <button
                key={player.id}
                className={`vote-button ${selectedPlayer === player.id ? 'selected' : ''}`}
                onClick={() => handleSelectPlayer(player.id)}
              >
                <span className="vote-name">{player.name}</span>
                {selectedPlayer === player.id && (
                  <span className="vote-check">✓</span>
                )}
              </button>
            ))}
            {alivePlayers.length === 0 && (
              <p className="no-players">No hay jugadores vivos</p>
            )}
          </div>
        </div>

        {deadPlayers.length > 0 && (
          <div className="players-section">
            <h3 className="section-title">Jugadores Eliminados</h3>
            <div className="voting-options">
              {deadPlayers.map(player => (
                <button
                  key={player.id}
                  className="vote-button disabled"
                  disabled
                >
                  <span className="vote-name">{player.name}</span>
                  <span className="vote-status-dead">💀</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="voting-actions">
          {selectedPlayer && (
            <div className="confirmation-buttons">
              <button
                className="action-button confirm-button"
                onClick={handleConfirmElimination}
              >
                Confirmar
              </button>
              <button
                className="action-button cancel-button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
