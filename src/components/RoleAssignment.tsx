import { useEffect, useState } from 'react';
import type { Player, GameConfig } from '../types';
import './RoleAssignment.css';

interface RoleAssignmentProps {
  config: GameConfig;
  onComplete: (players: Player[]) => void;
  onMasterHandoff: () => void;
  onStartGame?: () => void;
}

export default function RoleAssignment({ config, onComplete, onMasterHandoff, onStartGame }: RoleAssignmentProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    // Generar jugadores con roles aleatorios
    const newPlayers: Player[] = [];
    const roles: ('crewmate' | 'impostor')[] = [];
    
    // Agregar impostores
    for (let i = 0; i < config.impostors; i++) {
      roles.push('impostor');
    }
    
    // Agregar tripulantes
    for (let i = 0; i < config.crewmates; i++) {
      roles.push('crewmate');
    }
    
    // Mezclar roles
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    
    // Crear jugadores con nombres personalizados o por defecto
    for (let i = 0; i < config.totalPlayers; i++) {
      const playerName = config.playerNames && config.playerNames[i] 
        ? config.playerNames[i].trim() || `Jugador ${i + 1}`
        : `Jugador ${i + 1}`;
      
      newPlayers.push({
        id: `player-${i + 1}`,
        name: playerName,
        role: roles[i],
        isAlive: true,
        votes: 0,
      });
    }
    
    // Usar setTimeout para evitar llamar setState directamente en el efecto
    const timeoutId = setTimeout(() => {
      setPlayers(newPlayers);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [config]);

  const currentPlayer = players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex === players.length - 1;

  const handleNext = () => {
    if (showRole) {
      if (isLastPlayer) {
        onComplete(players);
        // Solo mostrar pantalla de master si es modo master
        if (config.gameMode === 'master') {
          onMasterHandoff();
        } else if (onStartGame) {
          // En modo no-master, ir directamente al juego
          onStartGame();
        }
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
        setShowRole(false);
      }
    } else {
      setShowRole(true);
    }
  };

  if (players.length === 0) {
    return <div className="role-assignment loading">Cargando...</div>;
  }

  return (
    <div className="role-assignment">
      <div className="role-header">
        <div className="player-counter">
          Jugador {currentPlayerIndex + 1} de {players.length}
        </div>
        <h2>{currentPlayer.name}</h2>
      </div>

      <div className="role-content">
        {!showRole ? (
          <div className="role-prompt">
            <p className="prompt-text">Pasa el dispositivo a</p>
            <p className="player-name">{currentPlayer.name}</p>
            <button className="reveal-button" onClick={handleNext}>
              Ver mi rol
            </button>
          </div>
        ) : (
          <div className="role-reveal">
            <div className={`role-card ${currentPlayer.role}`}>
              <div className="role-icon">
                {currentPlayer.role === 'impostor' ? '👹' : '👨‍🚀'}
              </div>
              {config.category && (
                <div className="category-badge">
                  <span className="category-label">Categoría:</span>
                  <span className="category-value">{config.category}</span>
                </div>
              )}
              <h3 className="role-title">
                {currentPlayer.role === 'impostor' ? 'IMPOSTOR' : (config.famousName || 'FAMOSO').toUpperCase()}
              </h3>
              <p className="role-description">
                {currentPlayer.role === 'impostor'
                  ? 'Tu objetivo es eliminar a todos los jugadores sin ser descubierto.'
                  : `Tu objetivo es encontrar a los impostores que se hacen pasar por ${config.famousName || 'famosos'}.`}
              </p>
            </div>
            <button className="next-button" onClick={handleNext}>
              {isLastPlayer ? 'Comenzar Juego' : 'Siguiente Jugador'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

