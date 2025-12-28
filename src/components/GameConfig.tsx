import { useState } from 'react';
import type { GameConfig } from '../types';
import { getRandomFamous } from '../data/famousList';
import './GameConfig.css';

interface GameConfigProps {
  onStart: (config: GameConfig) => void;
}

const STORAGE_KEY = 'impostor-game-config';

interface SavedConfig {
  totalPlayers: number;
  impostors: number;
  playerNames: string[];
  famousName: string;
  category: string;
  gameMode?: 'master' | 'no-master';
}

const loadSavedConfig = (): SavedConfig | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading saved config:', error);
  }
  return null;
};

const saveConfig = (config: SavedConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
};

export default function GameConfig({ onStart }: GameConfigProps) {
  const savedConfig = loadSavedConfig();
  
  const [totalPlayers, setTotalPlayers] = useState(savedConfig?.totalPlayers || 6);
  const [impostors, setImpostors] = useState(savedConfig?.impostors || 1);
  const [playerNames, setPlayerNames] = useState<string[]>(() => {
    if (savedConfig?.playerNames) {
      return savedConfig.playerNames;
    }
    return Array.from({ length: savedConfig?.totalPlayers || 6 }, () => '');
  });
  const [gameMode, setGameMode] = useState<'master' | 'no-master'>(savedConfig?.gameMode || 'master');
  const [famousName, setFamousName] = useState(savedConfig?.famousName || '');
  const [category, setCategory] = useState(savedConfig?.category || '');

  const crewmates = totalPlayers - impostors;
  const maxImpostors = Math.floor(totalPlayers / 2);

  const handleTotalPlayersChange = (value: number) => {
    if (value >= 4 && value <= 20) {
      setTotalPlayers(value);
      if (impostors > Math.floor(value / 2)) {
        setImpostors(Math.floor(value / 2));
      }
      // Ajustar array de nombres
      const newNames = [...playerNames];
      if (value > playerNames.length) {
        // Agregar nombres faltantes (vacíos para que el placeholder sea solo visual)
        for (let i = playerNames.length; i < value; i++) {
          newNames.push('');
        }
      } else if (value < playerNames.length) {
        // Remover nombres extras
        newNames.splice(value);
      }
      setPlayerNames(newNames);
    }
  };

  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = newName; // Permitir valores vacíos, el placeholder es solo visual
    setPlayerNames(updatedNames);
    // Guardar configuración
    saveConfig({
      totalPlayers,
      impostors,
      playerNames: updatedNames,
      famousName,
      category,
      gameMode,
    });
  };

  const handleFamousNameChange = (newName: string) => {
    setFamousName(newName);
    // Guardar configuración
    saveConfig({
      totalPlayers,
      impostors,
      playerNames,
      famousName: newName,
      category,
      gameMode,
    });
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    // Guardar configuración
    saveConfig({
      totalPlayers,
      impostors,
      playerNames,
      famousName,
      category: newCategory,
      gameMode,
    });
  };

  const handleImpostorsChange = (value: number) => {
    const max = Math.floor(totalPlayers / 2);
    if (value >= 1 && value <= max) {
      setImpostors(value);
      // Guardar configuración
      saveConfig({
        totalPlayers,
        impostors: value,
        playerNames,
        famousName,
        category,
        gameMode,
      });
    }
  };

  const handleGameModeChange = (mode: 'master' | 'no-master') => {
    setGameMode(mode);
    saveConfig({
      totalPlayers,
      impostors,
      playerNames,
      famousName,
      category,
      gameMode: mode,
    });
  };

  const handleStart = () => {
    // Usar nombres personalizados o valores por defecto si están vacíos
    const finalNames = playerNames.slice(0, totalPlayers).map((name, index) => 
      name.trim() || `Jugador ${index + 1}`
    );
    
    let finalFamousName: string;
    let finalCategory: string;
    
    if (gameMode === 'no-master') {
      // Elegir aleatoriamente de la lista
      const randomFamous = getRandomFamous();
      finalFamousName = randomFamous.name;
      finalCategory = randomFamous.category;
    } else {
      finalFamousName = famousName.trim() || 'Famoso';
      finalCategory = category.trim() || '';
    }
    
    // Guardar configuración antes de iniciar
    saveConfig({
      totalPlayers,
      impostors,
      playerNames: playerNames.slice(0, totalPlayers),
      famousName: gameMode === 'master' ? finalFamousName : '',
      category: gameMode === 'master' ? finalCategory : '',
      gameMode,
    });
    
    onStart({
      totalPlayers,
      impostors,
      crewmates,
      playerNames: finalNames,
      famousName: finalFamousName,
      category: finalCategory,
      gameMode,
    });
  };

  return (
    <div className="game-config">
      <div className="config-header">
        <h1>🎭 Impostor</h1>
        <p className="subtitle">Configura tu partida</p>
      </div>

      <div className="config-content">
        <div className="config-section">
          <label className="config-label">
            <span>Número de Jugadores</span>
            <span className="value-display">{totalPlayers}</span>
          </label>
          <div className="slider-container">
            <input
              type="range"
              min="4"
              max="20"
              value={totalPlayers}
              onChange={(e) => handleTotalPlayersChange(Number(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>4</span>
              <span>20</span>
            </div>
          </div>
        </div>

        <div className="config-section">
          <label className="config-label">
            <span>Número de Impostores</span>
            <span className="value-display">{impostors}</span>
          </label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max={maxImpostors}
              value={impostors}
              onChange={(e) => handleImpostorsChange(Number(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>1</span>
              <span>{maxImpostors}</span>
            </div>
          </div>
        </div>

        <div className="config-section">
          <label className="config-label">
            <span>Modo de Juego</span>
          </label>
          <div className="game-mode-selector">
            <button
              className={`mode-button ${gameMode === 'master' ? 'active' : ''}`}
              onClick={() => handleGameModeChange('master')}
            >
              Con Master
            </button>
            <button
              className={`mode-button ${gameMode === 'no-master' ? 'active' : ''}`}
              onClick={() => handleGameModeChange('no-master')}
            >
              Sin Master
            </button>
          </div>
          <p className="config-hint">
            {gameMode === 'master' 
              ? 'Un jugador controla la aplicación y elimina jugadores'
              : 'Se elige aleatoriamente un famoso y categoría de la lista'}
          </p>
        </div>

        {gameMode === 'master' && (
          <>
            <div className="config-section">
              <label className="config-label">
                <span>Nombre del Famoso</span>
              </label>
          <input
            type="text"
            value={famousName}
            onChange={(e) => handleFamousNameChange(e.target.value)}
            placeholder="Ej: Messi, Shakira, etc."
            className="player-name-input"
            maxLength={30}
          />
          <p className="config-hint">Este nombre aparecerá en lugar de "Tripulante"</p>
        </div>

        <div className="config-section">
          <label className="config-label">
            <span>Categoría</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            placeholder="Ej: Deportistas, Cantantes, Actores, etc."
            className="player-name-input"
            maxLength={30}
          />
          <p className="config-hint">Esta categoría se mostrará a todos los participantes</p>
        </div>
          </>
        )}

        <div className="config-section">
          <label className="config-label">
            <span>Nombres de los Jugadores</span>
          </label>
          <div className="player-names-container">
            {playerNames.slice(0, totalPlayers).map((name, index) => (
              <div key={index} className="player-name-input-wrapper">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Jugador ${index + 1}`}
                  className="player-name-input"
                  maxLength={20}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="config-summary">
          <div className="summary-item">
            <span className="summary-label">Famosos:</span>
            <span className="summary-value crewmate">{crewmates}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Impostores:</span>
            <span className="summary-value impostor">{impostors}</span>
          </div>
        </div>

        <button className="start-button" onClick={handleStart}>
          Iniciar Partida
        </button>
      </div>
    </div>
  );
}

