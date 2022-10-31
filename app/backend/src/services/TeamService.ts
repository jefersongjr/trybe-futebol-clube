import Team from '../database/models/TeamModel'
import ThrowException from '../middlewares/exceptions/ThrowException';

export class TeamService {
    public getTeams = async () => {

        const teams = await Team.findAll({})

        return teams;
    }
}
