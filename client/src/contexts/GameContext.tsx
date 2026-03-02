import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { GameState, GamePhase, Challenge, Badge } from "@/types/game";
import { getRandomChallenges } from "@/data/challenges";

interface GameContextType {
  state: GameState;
  startGame: (playerName: string) => void;
  nextChallenge: () => void;
  selectAnswer: (answerId: string) => void;
  submitAnswer: () => void;
  resetGame: () => void;
  setPhase: (phase: GamePhase) => void;
  showCertificate: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    phase: "menu",
    playerName: "",
    score: 0,
    level: 1,
    challengesCompleted: 0,
    currentChallenge: null,
    selectedAnswer: null,
    lives: 3,
    streak: 0,
    badges: [],
    completedChallengeIds: [],
  });

  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const startGame = useCallback((playerName: string) => {
    const challenges = getRandomChallenges(8);
    setAllChallenges(challenges);
    setCurrentChallengeIndex(0);

    setState((prev) => ({
      ...prev,
      phase: "playing",
      playerName,
      score: 0,
      level: 1,
      challengesCompleted: 0,
      lives: 3,
      streak: 0,
      badges: [],
      completedChallengeIds: [],
      currentChallenge: challenges[0],
      selectedAnswer: null,
    }));
  }, []);

  const nextChallenge = useCallback(() => {
    const nextIndex = currentChallengeIndex + 1;
    if (nextIndex >= allChallenges.length) {
      setState((prev) => ({
        ...prev,
        phase: "victory",
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      currentChallenge: allChallenges[nextIndex],
      selectedAnswer: null,
      phase: "playing",
    }));
    setCurrentChallengeIndex(nextIndex);
  }, [currentChallengeIndex, allChallenges]);

  const showCertificate = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "certificate" }));
  }, []);

  const selectAnswer = useCallback((answerId: string) => {
    setState((prev) => ({ ...prev, selectedAnswer: answerId }));
  }, []);

  const submitAnswer = useCallback(() => {
    if (!state.currentChallenge || !state.selectedAnswer) return;

    const isCorrect = state.currentChallenge.correctAnswer === state.selectedAnswer;
    const pointsEarned = isCorrect ? state.currentChallenge.points : 0;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newLives = isCorrect ? state.lives : state.lives - 1;

    let newBadges: Badge[] = [...state.badges];
    if (newStreak === 3 && !newBadges.find((b) => b.id === "streak-3")) {
      newBadges.push({
        id: "streak-3",
        name: "Racha de 3",
        description: "Acertou 3 desafios seguidos!",
        icon: "🔥",
        unlockedAt: new Date(),
      });
    }

    if (newLives <= 0) {
      setState((prev) => ({
        ...prev,
        phase: "gameover",
        score: prev.score + pointsEarned,
        challengesCompleted: prev.challengesCompleted + 1,
        streak: newStreak,
        lives: newLives,
        badges: newBadges,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      phase: "result",
      score: prev.score + pointsEarned,
      challengesCompleted: prev.challengesCompleted + 1,
      streak: newStreak,
      lives: newLives,
      badges: newBadges,
      completedChallengeIds: [...prev.completedChallengeIds, state.currentChallenge!.id],
    }));
  }, [state]);

  const resetGame = useCallback(() => {
    setState({
      phase: "menu",
      playerName: "",
      score: 0,
      level: 1,
      challengesCompleted: 0,
      currentChallenge: null,
      selectedAnswer: null,
      lives: 3,
      streak: 0,
      badges: [],
      completedChallengeIds: [],
    });
    setAllChallenges([]);
    setCurrentChallengeIndex(0);
  }, []);

  const setPhase = useCallback((phase: GamePhase) => {
    setState((prev) => ({ ...prev, phase }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        startGame,
        nextChallenge,
        selectAnswer,
        submitAnswer,
        resetGame,
        setPhase,
        showCertificate,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame deve ser usado dentro de GameProvider");
  return ctx;
}
