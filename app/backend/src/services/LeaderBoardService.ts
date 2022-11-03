import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel'
import ThrowException from '../middlewares/exceptions/ThrowException';

export class LeaderBoardService {
    public getLeaderHome = async () => {
        const homeMatchs = await Team.findAll({
            include: {
                model: Match, as : 'matchHome'
            }})
        return homeMatchs;
    }
}