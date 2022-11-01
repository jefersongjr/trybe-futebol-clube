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
}