import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Database, Cloud, GitBranch, Layers, Sparkles } from 'lucide-react';
import type { TechSkill } from '@/data/techStack';
import { techCategories } from '@/data/techStack';

interface TechTrackerProps {
  techStack: TechSkill[];
  setTechStack: (tech: TechSkill[]) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Core Java': <Cpu className="h-4 w-4" />,
  'Spring Ecosystem': <Layers className="h-4 w-4" />,
  'Database': <Database className="h-4 w-4" />,
  'Cloud (AWS)': <Cloud className="h-4 w-4" />,
  'DevOps': <GitBranch className="h-4 w-4" />,
  'System Design': <Layers className="h-4 w-4" />,
  'Additional': <Sparkles className="h-4 w-4" />,
};

const importanceColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-blue-100 text-blue-800',
};

export default function TechTracker({ techStack, setTechStack }: TechTrackerProps) {
  const toggleSubtopic = (skillId: string, subtopicIndex: number) => {
    const updated = techStack.map(skill => {
      if (skill.id !== skillId) return skill;
      const updatedSubtopics = skill.subtopics.map((st, idx) =>
        idx === subtopicIndex ? { ...st, completed: !st.completed } : st
      );
      return { ...skill, subtopics: updatedSubtopics };
    });
    setTechStack(updated);
  };

  const overallProgress = () => {
    const total = techStack.reduce((acc, s) => acc + s.subtopics.length, 0);
    const done = techStack.reduce((acc, s) => acc + s.subtopics.filter(st => st.completed).length, 0);
    return Math.round((done / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tech Stack Tracker</h1>
          <p className="text-muted-foreground mt-1">Track your technology learning progress</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{overallProgress()}%</div>
          <p className="text-sm text-muted-foreground">Overall Completion</p>
        </div>
      </div>

      <Tabs defaultValue="Core Java" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {techCategories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="flex items-center gap-1.5">
              {categoryIcons[cat]}
              <span className="hidden sm:inline">{cat}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {techCategories.map(cat => {
          const skills = techStack.filter(s => s.category === cat);
          return (
            <TabsContent key={cat} value={cat} className="space-y-4">
              {skills.map(skill => {
                const completed = skill.subtopics.filter(st => st.completed).length;
                const total = skill.subtopics.length;
                const percent = Math.round((completed / total) * 100);

                return (
                  <Card key={skill.id} className="glass-card card-sky">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{skill.name}</CardTitle>
                          <Badge variant="outline" className={importanceColors[skill.importance]}>
                            {skill.importance}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Month {skill.monthIntroduced}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={percent} className="h-2 flex-1" />
                        <span className="text-sm font-medium w-16 text-right">{completed}/{total}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {skill.subtopics.map((st, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              checked={st.completed}
                              onCheckedChange={() => toggleSubtopic(skill.id, idx)}
                              className="mt-0.5"
                            />
                            <span className={`text-sm ${st.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {st.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
