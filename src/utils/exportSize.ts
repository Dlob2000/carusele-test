import { Project } from '../store/schema';
export function getExportDimensions(project: Project) {
  return project.size;
}
