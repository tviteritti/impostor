import { useState } from 'react';
import RoleAssignment from './components/RoleAssignment';
import GameScreen from './components/GameScreen';
import GameResults from './components/GameResults';
import GameConfigComponent from './components/GameConfig';
import MasterHandoff from './components/MasterHandoff';
import './App.css';
import type { GameConfig, GamePhase, Player } from './types';

function App() {
  const [phase, setPhase] = useState<GamePhase>('config');
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<'crewmate' | 'impostor' | null>(null);

  const handleConfigStart = (gameConfig: GameConfig) => {
    setConfig(gameConfig);
    setPhase('assigning');
  };

  const handleRoleAssignmentComplete = (assignedPlayers: Player[]) => {
    setPlayers(assignedPlayers);
  };

  const handleMasterHandoff = () => {
    setPhase('master-handoff');
  };

  const handleStartGame = () => {
    setPhase('playing');
  };

  const handleGameEnd = (gameWinner: 'crewmate' | 'impostor', updatedPlayers: Player[]) => {
    setWinner(gameWinner);
    setPlayers(updatedPlayers);
    setPhase('results');
  };

  const handleNewGame = () => {
    setPhase('config');
    setConfig(null);
    setPlayers([]);
    setWinner(null);
  };

  const handleBackToConfig = () => {
    setPhase('config');
  };

  return (
    <div className="app">
      {phase === 'config' && <GameConfigComponent onStart={handleConfigStart} />}
      {phase === 'assigning' && config && (
        <RoleAssignment 
          config={config} 
          onComplete={handleRoleAssignmentComplete}
          onMasterHandoff={handleMasterHandoff}
          onStartGame={handleStartGame}
        />
      )}
      {phase === 'master-handoff' && config && (
        <MasterHandoff config={config} onContinue={handleStartGame} />
      )}
      {phase === 'playing' && config && players.length > 0 && (
        <GameScreen
          players={players}
          config={config}
          onGameEnd={handleGameEnd}
          onBackToConfig={handleBackToConfig}
        />
      )}
      {phase === 'results' && players.length > 0 && winner && config && (
        <GameResults players={players} winner={winner} config={config} onNewGame={handleNewGame} />
      )}
    </div>
  );
}

export default App;
