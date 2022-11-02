import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel'
import ThrowException from '../middlewares/exceptions/ThrowException';
import Query = require('mysql2/typings/mysql/lib/protocol/sequences/Query');
console.log(Match)
export class MatchService {
    public getMatches = async ( therm: any) => {
      const matches = await Match.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
            }, { model: Team, as: 'teamAway', attributes: { exclude: ['id']} 
        }
    ],
      });

      if(!therm) return matches;
      if(therm === 'true') return matches.filter((x) => x.inProgress === true);
      if(therm === 'false') return matches.filter((x) => x.inProgress === false);

          return matches
  }
  public addMatch = async (homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals:number) => {
    if(!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals){
      throw new ThrowException(401, 'Insert all values');
    }
    const teams = await Team.findAll({});
    const validate1 = teams.some((x) => x.id === awayTeam);
    const validate2 = teams.some((x) => x.id === homeTeam);
    if (!validate1 || !validate2) {
      throw new ThrowException(404, 'There is no team with such id!');
    }
    if (homeTeam === awayTeam) throw new ThrowException(422, 'It is not possible to create a match with two equal teams');
    const newMatch = Match.create({homeTeam , awayTeam ,homeTeamGoals , awayTeamGoals, inProgress: true })
    return newMatch;
  }
}
