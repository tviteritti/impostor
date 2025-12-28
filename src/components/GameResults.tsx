import type { Player, GameConfig } from '../types';
import './GameResults.css';

interface GameResultsProps {
  players: Player[];
  winner: 'crewmate' | 'impostor';
  config: GameConfig;
  onNewGame: () => void;
}

export default function GameResults({ players, winner, config, onNewGame }: GameResultsProps) {
  const impostors = players.filter(p => p.role === 'impostor');
  const crewmates = players.filter(p => p.role === 'crewmate');
  const famousName = config.famousName || 'Famosos';

  return (
    <div className="game-results">
      <div className="results-header">
        <div className={`winner-badge ${winner}`}>
          <div className="winner-icon">
            {winner === 'impostor' ? '👹' : '👨‍🚀'}
          </div>
          <h1 className="winner-title">
            {winner === 'impostor' ? 'IMPOSTORES' : famousName.toUpperCase()}
          </h1>
          <p className="winner-subtitle">¡VICTORIA!</p>
        </div>
      </div>

      <div className="results-content">
        <div className="roles-section">
          <div className="role-group">
            <h3 className="role-group-title impostor">Impostores</h3>
            <div className="role-list">
              {impostors.map(player => (
                <div key={player.id} className="result-player">
                  <span className="player-icon">👹</span>
                  <span className="player-name">{player.name}</span>
                  <span className={`player-status ${player.isAlive ? 'alive' : 'dead'}`}>
                    {player.isAlive ? 'Vivo' : 'Eliminado'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="role-group">
            <h3 className="role-group-title crewmate">{famousName}</h3>
            <div className="role-list">
              {crewmates.map(player => (
                <div key={player.id} className="result-player">
                  <span className="player-icon">👨‍🚀</span>
                  <span className="player-name">{player.name}</span>
                  <span className={`player-status ${player.isAlive ? 'alive' : 'dead'}`}>
                    {player.isAlive ? 'Vivo' : 'Eliminado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="new-game-button" onClick={onNewGame}>
          Nueva Partida
        </button>
      </div>
    </div>
  );
}

