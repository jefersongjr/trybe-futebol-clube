import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel'
import ThrowException from '../middlewares/exceptions/ThrowException';
console.log(Match)
export class MatchService {
    public getMatches = async () => {
        const matches = await Match.findAll({
            include: [
              { model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
                }, { model: Team, as: 'teamAway', attributes: { exclude: ['id']} 
            }
        ],
          });
        console.log(matches)
        return matches;
    }
}

