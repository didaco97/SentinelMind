import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type TrustStatus = 'stable' | 'warning' | 'limited';
export type DeviceContext = 'known' | 'new' | 'suspicious';
export type ActionSpeed = 'normal' | 'rapid' | 'very-rapid';
export type TimeOfDay = 'working-hours' | 'off-hours';

interface SimulatorState {
  // Simulator controls
  simulatorMode: boolean;
  stressLevel: number;
  actionSpeed: ActionSpeed;
  deviceContext: DeviceContext;
  timeOfDay: TimeOfDay;
  
  // Computed states
  reliabilityScore: number;
  trustStatus: TrustStatus;
  isAccessLimited: boolean;
  
  // Auth state
  isAuthenticated: boolean;
  userName: string;
  
  // UI state
  showAccessModal: boolean;
  showExplainability: boolean;
}

interface SimulatorActions {
  setSimulatorMode: (enabled: boolean) => void;
  setStressLevel: (level: number) => void;
  setActionSpeed: (speed: ActionSpeed) => void;
  setDeviceContext: (context: DeviceContext) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  login: (username: string) => void;
  logout: () => void;
  requestElevatedAccess: () => void;
  closeAccessModal: () => void;
  openExplainability: () => void;
  closeExplainability: () => void;
}

interface SimulatorContextType extends SimulatorState, SimulatorActions {}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

const calculateReliabilityScore = (
  stressLevel: number,
  actionSpeed: ActionSpeed,
  deviceContext: DeviceContext,
  timeOfDay: TimeOfDay
): number => {
  let score = 100;
  
  // Stress level impact (0-100 -> 0-40 point reduction)
  score -= (stressLevel / 100) * 40;
  
  // Action speed impact
  if (actionSpeed === 'rapid') score -= 15;
  if (actionSpeed === 'very-rapid') score -= 30;
  
  // Device context impact
  if (deviceContext === 'new') score -= 15;
  if (deviceContext === 'suspicious') score -= 35;
  
  // Time of day impact
  if (timeOfDay === 'off-hours') score -= 10;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

const getTrustStatus = (score: number): TrustStatus => {
  if (score >= 70) return 'stable';
  if (score >= 40) return 'warning';
  return 'limited';
};

export const SimulatorProvider = ({ children }: { children: ReactNode }) => {
  const [simulatorMode, setSimulatorModeState] = useState(false);
  const [stressLevel, setStressLevelState] = useState(10);
  const [actionSpeed, setActionSpeedState] = useState<ActionSpeed>('normal');
  const [deviceContext, setDeviceContextState] = useState<DeviceContext>('known');
  const [timeOfDay, setTimeOfDayState] = useState<TimeOfDay>('working-hours');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showExplainability, setShowExplainability] = useState(false);

  // Calculate derived state
  const reliabilityScore = calculateReliabilityScore(
    stressLevel,
    actionSpeed,
    deviceContext,
    timeOfDay
  );
  const trustStatus = getTrustStatus(reliabilityScore);
  const isAccessLimited = trustStatus === 'limited';

  // Actions
  const setSimulatorMode = useCallback((enabled: boolean) => {
    setSimulatorModeState(enabled);
  }, []);

  const setStressLevel = useCallback((level: number) => {
    setStressLevelState(level);
    // Trigger access modal if score drops below threshold
    const newScore = calculateReliabilityScore(level, actionSpeed, deviceContext, timeOfDay);
    if (newScore < 40 && !showAccessModal && !showExplainability) {
      setShowAccessModal(true);
    }
  }, [actionSpeed, deviceContext, timeOfDay, showAccessModal, showExplainability]);

  const setActionSpeed = useCallback((speed: ActionSpeed) => {
    setActionSpeedState(speed);
    const newScore = calculateReliabilityScore(stressLevel, speed, deviceContext, timeOfDay);
    if (newScore < 40 && !showAccessModal && !showExplainability) {
      setShowAccessModal(true);
    }
  }, [stressLevel, deviceContext, timeOfDay, showAccessModal, showExplainability]);

  const setDeviceContext = useCallback((context: DeviceContext) => {
    setDeviceContextState(context);
    const newScore = calculateReliabilityScore(stressLevel, actionSpeed, context, timeOfDay);
    if (newScore < 40 && !showAccessModal && !showExplainability) {
      setShowAccessModal(true);
    }
  }, [stressLevel, actionSpeed, timeOfDay, showAccessModal, showExplainability]);

  const setTimeOfDay = useCallback((time: TimeOfDay) => {
    setTimeOfDayState(time);
    const newScore = calculateReliabilityScore(stressLevel, actionSpeed, deviceContext, time);
    if (newScore < 40 && !showAccessModal && !showExplainability) {
      setShowAccessModal(true);
    }
  }, [stressLevel, actionSpeed, deviceContext, showAccessModal, showExplainability]);

  const login = useCallback((username: string) => {
    setIsAuthenticated(true);
    setUserName(username);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserName('');
    // Reset simulator state
    setStressLevelState(10);
    setActionSpeedState('normal');
    setDeviceContextState('known');
    setTimeOfDayState('working-hours');
    setShowAccessModal(false);
    setShowExplainability(false);
  }, []);

  const requestElevatedAccess = useCallback(() => {
    setShowAccessModal(false);
    setShowExplainability(true);
  }, []);

  const closeAccessModal = useCallback(() => {
    setShowAccessModal(false);
  }, []);

  const openExplainability = useCallback(() => {
    setShowExplainability(true);
  }, []);

  const closeExplainability = useCallback(() => {
    setShowExplainability(false);
    // Reset to stable state for demo purposes
    setStressLevelState(10);
    setActionSpeedState('normal');
    setDeviceContextState('known');
    setTimeOfDayState('working-hours');
  }, []);

  const value: SimulatorContextType = {
    // State
    simulatorMode,
    stressLevel,
    actionSpeed,
    deviceContext,
    timeOfDay,
    reliabilityScore,
    trustStatus,
    isAccessLimited,
    isAuthenticated,
    userName,
    showAccessModal,
    showExplainability,
    // Actions
    setSimulatorMode,
    setStressLevel,
    setActionSpeed,
    setDeviceContext,
    setTimeOfDay,
    login,
    logout,
    requestElevatedAccess,
    closeAccessModal,
    openExplainability,
    closeExplainability,
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
};

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (context === undefined) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};
