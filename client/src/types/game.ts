/**
 * Tipos do jogo educativo de Segurança da Informação (CyberGuard-style)
 */
export type GamePhase = "menu" | "playing" | "result" | "gameover" | "victory" | "certificate";

export type ChallengeType = "password" | "phishing" | "privacy" | "social_media" | "data_protection";

export interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  question: string;
  options: ChallengeOption[];
  correctAnswer: string;
  explanation: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  tips?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface GameState {
  phase: GamePhase;
  playerName: string;
  score: number;
  level: number;
  challengesCompleted: number;
  currentChallenge: Challenge | null;
  selectedAnswer: string | null;
  lives: number;
  streak: number;
  badges: Badge[];
  completedChallengeIds: string[];
}

export interface GameResult {
  challengeId: string;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent: number;
}

export interface Leaderboard {
  playerName: string;
  score: number;
  level: number;
  challengesCompleted: number;
  badges: number;
}
