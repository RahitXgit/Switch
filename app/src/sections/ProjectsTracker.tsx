import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GitBranch, Github, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  timeline: string;
  monthStart: number;
  features: string[];
  githubUrl: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface ProjectsTrackerProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export default function ProjectsTracker({ projects, setProjects }: ProjectsTrackerProps) {
  const [editUrl, setEditUrl] = useState('');
  const [editStatus, setEditStatus] = useState<Project['status']>('not-started');
  const [completedFeatures, setCompletedFeatures] = useState<Record<string, string[]>>({});

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, ...updates } : p));
  };

  const toggleFeature = (projectId: string, feature: string) => {
    setCompletedFeatures(prev => {
      const current = prev[projectId] || [];
      const updated = current.includes(feature)
        ? current.filter(f => f !== feature)
        : [...current, feature];
      return { ...prev, [projectId]: updated };
    });
  };

  const getFeatureProgress = (project: Project) => {
    const done = completedFeatures[project.id]?.length || 0;
    const total = project.features.length;
    return { done, total, percent: Math.round((done / total) * 100) };
  };

  const statusColors = {
    'not-started': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects Tracker</h1>
        <p className="text-muted-foreground mt-1">Build these 3 portfolio projects to showcase your skills</p>
      </div>

      <div className="grid gap-6">
        {projects.map((project, idx) => {
          const fp = getFeatureProgress(project);
          return (
            <Card key={project.id} className="glass-card card-amber overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left: Project Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <Badge className={statusColors[project.status]}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-4 w-4" />
                      {project.timeline}
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    )}
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Feature Progress</span>
                      <span className="font-medium">{fp.done}/{fp.total}</span>
                    </div>
                    <Progress value={fp.percent} className="h-2" />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => {
                          setEditUrl(project.githubUrl);
                          setEditStatus(project.status);
                        }}>
                          Edit Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit {project.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <div className="flex gap-2">
                              {(['not-started', 'in-progress', 'completed'] as const).map(s => (
                                <Button
                                  key={s}
                                  variant={editStatus === s ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => setEditStatus(s)}
                                >
                                  {s.replace('-', ' ')}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub URL</label>
                            <Input
                              value={editUrl}
                              onChange={e => setEditUrl(e.target.value)}
                              placeholder="https://github.com/username/repo"
                            />
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => {
                              updateProject(project.id, { status: editStatus, githubUrl: editUrl });
                            }}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant={project.status === 'in-progress' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateProject(project.id, {
                        status: project.status === 'not-started' ? 'in-progress' :
                                project.status === 'in-progress' ? 'completed' : 'not-started'
                      })}
                    >
                      {project.status === 'not-started' ? 'Start Project' :
                       project.status === 'in-progress' ? 'Mark Complete' : 'Reopen'}
                    </Button>
                  </div>
                </div>

                {/* Right: Features Checklist */}
                <div className="lg:w-[400px] bg-muted/30 p-6 border-t lg:border-t-0 lg:border-l">
                  <h4 className="font-medium mb-3">Features Checklist</h4>
                  <div className="space-y-2">
                    {project.features.map((feature, fidx) => {
                      const isDone = completedFeatures[project.id]?.includes(feature) || false;
                      return (
                        <div
                          key={fidx}
                          className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            checked={isDone}
                            onCheckedChange={() => toggleFeature(project.id, feature)}
                            className="mt-0.5"
                          />
                          <span className={`text-sm ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                            {feature}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 border-blue-200 dark:border-blue-800 glass-card">
        <CardHeader>
          <CardTitle className="text-base">Project Building Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 text-sm">
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>Write comprehensive README with setup instructions</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>Add architecture diagrams to your docs</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>Target 80%+ test coverage</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>Deploy on AWS and share live URLs</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>Use proper Git branching (feature/*, main)</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>Add API documentation (Swagger/OpenAPI)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
