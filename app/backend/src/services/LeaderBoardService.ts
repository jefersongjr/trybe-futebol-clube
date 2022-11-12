import Team from '../database/models/TeamModel'

export class LeaderBoardService { 
    public getLeaderHome = async () => {
    const queryHome = `SELECT 
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
const [homeMatchs]: any = await Team.sequelize?.query(queryHome);

return homeMatchs
    }

    public getLeaderAway = async () => {
        const queryAway = `SELECT 
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
    const [awayMatchs]: any = await Team.sequelize?.query(queryAway);

    return awayMatchs;

    }
}
