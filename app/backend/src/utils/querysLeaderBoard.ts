
export const queryAll = `SELECT
name,
SUM(le.totalPoints) AS totalPoints,
SUM(totalGames) AS totalGames, 
SUM(totalVictories) AS totalVictories,
SUM(totalDraws) AS totalDraws,
SUM(totalLosses) AS totalLosses,
SUM(goalsFavor) AS goalsFavor,
SUM(goalsOwn) AS goalsOwn,
SUM(goalsBalance) AS goalsBalance,
ROUND((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100, 2) AS efficiency FROM ( 
  SELECT te.team_name AS name,
    (SUM(IF (ma.home_team_goals > ma.away_team_goals, 3, 0)) +
    SUM(IF (ma.home_team_goals < ma.away_team_goals, 0, 0)) +
    SUM(IF (ma.home_team_goals = ma.away_team_goals, 1, 0))) AS totalPoints,
    COUNT(te.team_name) AS totalGames,
    SUM(IF (ma.home_team_goals > ma.away_team_goals, 1, 0)) AS totalVictories,
    SUM(IF (ma.home_team_goals = ma.away_team_goals, 1, 0)) AS totalDraws,
    SUM(IF (ma.home_team_goals < ma.away_team_goals, 1, 0)) AS totalLosses,
    SUM(ma.home_team_goals) AS goalsFavor,
    SUM(ma.away_team_goals) AS goalsOwn,
    (SUM(ma.home_team_goals) - SUM(ma.away_team_goals)) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.teams AS te
    JOIN TRYBE_FUTEBOL_CLUBE.matches AS ma ON te.id = ma.home_team
    WHERE in_progress = 0
        GROUP BY te.team_name
  UNION ALL
  SELECT te.team_name AS name,
    (SUM(IF (ma.away_team_goals > ma.home_team_goals, 3, 0)) +
    SUM(IF (ma.away_team_goals < ma.home_team_goals, 0, 0)) +
    SUM(IF (ma.away_team_goals = ma.home_team_goals, 1, 0))) AS totalPoints,
    COUNT(te.team_name) AS totalGames,
    SUM(IF (ma.away_team_goals > ma.home_team_goals, 1, 0)) AS totalVictories,
    SUM(IF (ma.away_team_goals = ma.home_team_goals, 1, 0)) AS totalDraws,
    SUM(IF (ma.away_team_goals < ma.home_team_goals, 1, 0)) AS totalLosses,
    SUM(ma.away_team_goals) AS goalsFavor,
    SUM(ma.home_team_goals) AS goalsOwn,
    (SUM(ma.away_team_goals) - SUM(ma.home_team_goals)) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.teams AS te
    JOIN TRYBE_FUTEBOL_CLUBE.matches AS ma ON te.id = ma.away_team
    WHERE in_progress = 0
        GROUP BY te.team_name
    ) AS le
GROUP BY le.name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;