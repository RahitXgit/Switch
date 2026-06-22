import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { DSAProgress } from '@/data/dsaProblems';
import type { TechSkill } from '@/data/techStack';
import { defaultTechStack, projects as defaultProjects } from '@/data/techStack';
import Dashboard from '@/sections/Dashboard';
import DSATracker from '@/sections/DSATracker';
import TechTracker from '@/sections/TechTracker';
import RoadmapView from '@/sections/RoadmapView';
import ProjectsTracker from '@/sections/ProjectsTracker';
import {
  LayoutDashboard,
  Code2,
  Layers,
  Map,
  FolderGit2,
  Settings,
  Trophy,
  Target,
  Flame,
  Sun,
  Moon,
} from 'lucide-react';
import './App.css';

function App() {
  const { resolvedTheme, setTheme } = useTheme();
  const [dsaProgress, setDsaProgress] = useLocalStorage<DSAProgress>('dsa-progress', {});
  const [techStack, setTechStack] = useLocalStorage<TechSkill[]>('tech-stack', defaultTechStack);
  const [projects, setProjects] = useLocalStorage('projects', defaultProjects);
  const [currentMonth, setCurrentMonth] = useLocalStorage('current-month', 1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [streak, setStreak] = useLocalStorage('streak', 0);
  const [lastActive, setLastActive] = useLocalStorage('last-active', '');

  // Check and update streak
  const today = new Date().toISOString().split('T')[0];
  if (lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastActive === yesterday.toISOString().split('T')[0]) {
      setStreak(streak + 1);
    } else if (lastActive !== today) {
      setStreak(1);
    }
    setLastActive(today);
  }

  const totalSolved = Object.values(dsaProgress).filter(p => p.solved).length;
  const monthlyTarget = 30;
  const monthProgress = Math.min(100, Math.round((totalSolved / (currentMonth * monthlyTarget)) * 100));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold leading-tight">Career Growth Tracker</h1>
                <p className="text-xs text-muted-foreground">7 LPA → 14 LPA</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-medium">{streak} day streak</span>
              </div>

              {/* Monthly Progress */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Month {currentMonth}</span>
                <div className="w-24">
                  <Progress value={monthProgress} className="h-2" />
                </div>
              </div>

              {/* Month Selector */}
              <Select value={String(currentMonth)} onValueChange={v => setCurrentMonth(Number(v))}>
                <SelectTrigger className="w-[100px] h-8 text-xs">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 18 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>Month {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Dark Mode Toggle */}
              <Button
                id="theme-toggle"
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 overflow-hidden"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Settings Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Month</label>
                      <Select value={String(currentMonth)} onValueChange={v => setCurrentMonth(Number(v))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 18 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>Month {i + 1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Danger Zone</label>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm('Are you sure? This will reset ALL progress!')) {
                            setDsaProgress({});
                            setTechStack(defaultTechStack);
                            setProjects(defaultProjects);
                            setCurrentMonth(1);
                            setStreak(0);
                          }
                        }}
                      >
                        Reset All Progress
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 p-1 w-full justify-start">
            <TabsTrigger value="dashboard" className="flex items-center gap-1.5 px-3 py-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="dsa" className="flex items-center gap-1.5 px-3 py-2">
              <Code2 className="h-4 w-4" />
              <span className="hidden sm:inline">DSA</span>
              <span className="sm:hidden">{totalSolved}</span>
            </TabsTrigger>
            <TabsTrigger value="tech" className="flex items-center gap-1.5 px-3 py-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Tech Stack</span>
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-1.5 px-3 py-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Roadmap</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1.5 px-3 py-2">
              <FolderGit2 className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <Dashboard dsaProgress={dsaProgress} techStack={techStack} currentMonth={currentMonth} />
          </TabsContent>

          <TabsContent value="dsa" className="mt-0">
            <DSATracker progress={dsaProgress} setProgress={setDsaProgress} />
          </TabsContent>

          <TabsContent value="tech" className="mt-0">
            <TechTracker techStack={techStack} setTechStack={setTechStack} />
          </TabsContent>

          <TabsContent value="roadmap" className="mt-0">
            <RoadmapView currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <ProjectsTracker projects={projects} setProjects={setProjects} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Career Growth Tracker — 7 LPA → 14 LPA Roadmap
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Target: 14 LPA
              </span>
              <span>Month {currentMonth}/18</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
