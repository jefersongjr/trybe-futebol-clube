import { queryAll, queryAway, queryHome } from '../utils/querysLeaderBoard';
import Team from '../database/models/TeamModel'

export class LeaderBoardService { 
    public getLeaderHome = async () => {
const [homeMatchs]: any = await Team.sequelize?.query(queryHome);

return homeMatchs
    }

    public getLeaderAway = async () => {
    const [awayMatchs]: any = await Team.sequelize?.query(queryAway);

    return awayMatchs;

    }

    public getLeader = async () => {
    const [allMatchs]: any = await Team.sequelize?.query(queryAll);

    return allMatchs;
    }
}
