import Team from '../database/models/TeamModel'
import ThrowException from '../middlewares/exceptions/ThrowException';

export class TeamService {
    public getTeams = async () => {
        const teams = await Team.findAll({})
        return teams;
    }

    public getById = async (id: string) => {
        const team = await Team.findByPk(id);  
        if(!team) throw new ThrowException(401, 'Team not exists')  
        console.log(id)    
        return team;
    }
}
