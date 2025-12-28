import type { GameConfig } from '../types';
import './MasterHandoff.css';

interface MasterHandoffProps {
  config: GameConfig;
  onContinue: () => void;
}

export default function MasterHandoff({ config, onContinue }: MasterHandoffProps) {
  return (
    <div className="master-handoff">
      <div className="handoff-content">
        <div className="handoff-icon">👑</div>
        <h1 className="handoff-title">Pasar al Master</h1>
        <p className="handoff-description">
          Todos los jugadores han visto sus roles.
        </p>
        <p className="handoff-instruction">
          Ahora pasa el dispositivo al Master para comenzar la partida.
        </p>
        {config.category && (
          <div className="category-display">
            <span className="category-label">Categoría:</span>
            <span className="category-value">{config.category}</span>
          </div>
        )}
        <button className="continue-button" onClick={onContinue}>
          Comenzar Partida
        </button>
      </div>
    </div>
  );
}

