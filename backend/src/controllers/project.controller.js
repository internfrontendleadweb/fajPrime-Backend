import { prisma } from "../config/db.js";
import { serializeProject } from "../utils/serializers.js";
import { toEnum, projectStatusReverse } from "../utils/enumMaps.js";

// GET /api/projects?status=current
export const getProjects = async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status) where.status = toEnum(projectStatusReverse, status);

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(projects.map(serializeProject));
};

// GET /api/projects/:slug
export const getProjectBySlug = async (req, res) => {
  const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(serializeProject(project));
};
