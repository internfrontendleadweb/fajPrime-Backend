import { prisma } from "../config/db.js";
import { serializeTeamMember } from "../utils/serializers.js";
import { toEnum, teamGroupReverse } from "../utils/enumMaps.js";

// GET /api/team?group=board
export const getTeam = async (req, res) => {
  const { group } = req.query;
  const where = {};
  if (group) where.group = toEnum(teamGroupReverse, group);

  const team = await prisma.teamMember.findMany({
    where,
    orderBy: [{ group: "asc" }, { order: "asc" }],
  });
  res.json(team.map(serializeTeamMember));
};
