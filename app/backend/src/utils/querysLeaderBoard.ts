export const queryHome = `SELECT 
team_name as name,
(SUM(IF(home_team_goals > away_team_goals, 1, 0))) * 3 + SUM(IF(home_team_goals = away_team_goals, 1, 0)) AS totalPoints,
COUNT(team_name) AS totalGames,
SUM(IF(home_team_goals > away_team_goals, 1, 0)) AS totalVictories,
SUM(IF(home_team_goals = away_team_goals, 1, 0)) AS totalDraws,
SUM(IF(home_team_goals < away_team_goals, 1, 0)) AS totalLosses,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
SUM(home_team_goals) - SUM(away_team_goals) AS goalsBalance,
ROUND(((((SUM(IF(home_team_goals > away_team_goals, 1, 0))) * 3 + SUM(IF(home_team_goals = away_team_goals, 1, 0))) / (count(team_name)* 3)) * 100) ,2) 
AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS teams
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches ON teams.id = matches.home_team
WHERE in_progress = 0
GROUP BY team_name
Order by (SUM(IF(home_team_goals > away_team_goals, 1, 0))) * 3 + SUM(IF(home_team_goals = away_team_goals, 1, 0)) DESC,
SUM(home_team_goals) - SUM(away_team_goals) DESC, SUM(home_team_goals) DESC, SUM(away_team_goals) DESC;`

export  const queryAway = `SELECT 
  team_name as name,
  (SUM(IF(home_team_goals < away_team_goals, 1, 0))) * 3 + SUM(IF(home_team_goals = away_team_goals, 1, 0)) AS totalPoints,
  COUNT(team_name) AS totalGames,
  SUM(IF(home_team_goals < away_team_goals, 1, 0)) AS totalVictories,
  SUM(IF(home_team_goals = away_team_goals, 1, 0)) AS totalDraws,
  SUM(IF(home_team_goals > away_team_goals, 1, 0)) AS totalLosses,
  SUM(away_team_goals) AS goalsFavor,
  SUM(home_team_goals) AS goalsOwn,
  SUM(away_team_goals) - SUM(home_team_goals) AS goalsBalance,
  ROUND(((((SUM(IF(home_team_goals < away_team_goals, 1, 0))) * 3 + SUM(IF(home_team_goals = away_team_goals, 1, 0))) / (count(team_name)* 3)) * 100) ,2) 
  AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams AS teams
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches ON teams.id = matches.away_team
  WHERE in_progress = 0
  GROUP BY team_name
  Order by (SUM(IF(home_team_goals < away_team_goals, 1, 0))) * 3 + SUM(IF(home_team_goals = away_team_goals, 1, 0)) DESC,
  SUM(away_team_goals) - SUM(home_team_goals) DESC, SUM(away_team_goals) DESC, SUM(home_team_goals) DESC;`

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