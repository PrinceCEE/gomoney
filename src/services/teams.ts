import { TeamRepository } from "src/database";

export class TeamsService {
  constructor(private readonly teamRepository: TeamRepository) {}
}
