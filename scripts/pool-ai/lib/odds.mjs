/**
 * Derive per-team expected games played and expected wins from round-by-round
 * advancement probabilities.
 *
 * Input per team (all unconditional):
 *   r1  = P(win round 1)       ( = P(make 2nd round) )
 *   r2  = P(win round 2)       ( = P(make 3rd round) )
 *   r3  = P(win round 3)       ( = P(make final)     )
 *   cup = P(win round 4)       ( = P(win cup)        )
 *
 * Assumptions:
 *   E[games in a played series] ≈ AVG_SERIES_LEN (5.8 historical).
 *   Winner of a series wins 4 games; loser wins (AVG_SERIES_LEN - 4).
 *   P(play round k) = P(advanced from round k-1); R1 always played.
 */

export const AVG_SERIES_LEN = 5.8;
export const WINNER_WINS = 4;
export const LOSER_WINS = AVG_SERIES_LEN - WINNER_WINS; // 1.8

/**
 * Compute unconditional "plays round K" probabilities and conditional
 * "wins round K given plays" probabilities.
 */
export function roundSurvival(t) {
  const playR1 = 1;
  const playR2 = t.r1;
  const playR3 = t.r2;
  const playR4 = t.r3;

  const winR1 = t.r1;                        // P(win | play R1)
  const winR2 = safeDiv(t.r2, playR2);       // P(win R2 | play R2)
  const winR3 = safeDiv(t.r3, playR3);       // P(win R3 | play R3)
  const winR4 = safeDiv(t.cup, playR4);      // P(win R4 | play R4)

  return {
    play: [playR1, playR2, playR3, playR4],
    winGivenPlay: [winR1, winR2, winR3, winR4],
  };
}

/** E[games played by team across playoffs]. */
export function expectedGamesPlayed(t) {
  const { play } = roundSurvival(t);
  return AVG_SERIES_LEN * play.reduce((s, p) => s + p, 0);
}

/**
 * E[team wins across playoffs].
 * In each round a team plays: winner path contributes 4 wins, loser path
 * contributes LOSER_WINS wins (≈ 1.8), weighted by conditional win prob.
 */
export function expectedTeamWins(t) {
  const { play, winGivenPlay } = roundSurvival(t);
  let total = 0;
  for (let k = 0; k < 4; k++) {
    const p = play[k];
    const w = winGivenPlay[k];
    total += p * (w * WINNER_WINS + (1 - w) * LOSER_WINS);
  }
  return total;
}

/**
 * Per-round breakdown useful for display and for stacking analysis:
 *   { round, playProb, winProbGivenPlay, eGames, eWins }
 */
export function perRoundBreakdown(t) {
  const { play, winGivenPlay } = roundSurvival(t);
  return play.map((p, k) => {
    const w = winGivenPlay[k];
    return {
      round: k + 1,
      playProb: p,
      winProbGivenPlay: w,
      eGames: p * AVG_SERIES_LEN,
      eWins: p * (w * WINNER_WINS + (1 - w) * LOSER_WINS),
    };
  });
}

function safeDiv(num, den) {
  if (!den) return 0;
  return num / den;
}
