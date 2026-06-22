import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code2, Cloud, Target, Trophy, TrendingUp, Clock, Calendar } from 'lucide-react';
import type { DSAProgress } from '@/data/dsaProblems';
import { dsaProblems, getTopicProgress } from '@/data/dsaProblems';
import type { TechSkill } from '@/data/techStack';
import { months } from '@/data/roadmap';

interface DashboardProps {
  dsaProgress: DSAProgress;
  techStack: TechSkill[];
  currentMonth: number;
}

export default function Dashboard({ dsaProgress, techStack, currentMonth }: DashboardProps) {
  const stats = useMemo(() => {
    const totalProblems = dsaProblems.length;
    const solvedProblems = Object.values(dsaProgress).filter(p => p.solved).length;
    const totalEasy = dsaProblems.filter(p => p.difficulty === 'Easy').length;
    const easySolved = dsaProblems.filter(p => p.difficulty === 'Easy' && dsaProgress[p.id]?.solved).length;
    const totalMedium = dsaProblems.filter(p => p.difficulty === 'Medium').length;
    const mediumSolved = dsaProblems.filter(p => p.difficulty === 'Medium' && dsaProgress[p.id]?.solved).length;
    const totalHard = dsaProblems.filter(p => p.difficulty === 'Hard').length;
    const hardSolved = dsaProblems.filter(p => p.difficulty === 'Hard' && dsaProgress[p.id]?.solved).length;
    const overallPercent = Math.round((solvedProblems / totalProblems) * 100);

    const totalSubtopics = techStack.reduce((acc, skill) => acc + skill.subtopics.length, 0);
    const completedSubtopics = techStack.reduce(
      (acc, skill) => acc + skill.subtopics.filter(st => st.completed).length,
      0
    );
    const techPercent = Math.round((completedSubtopics / totalSubtopics) * 100);

    return {
      totalProblems,
      solvedProblems,
      totalEasy,
      easySolved,
      totalMedium,
      mediumSolved,
      totalHard,
      hardSolved,
      overallPercent,
      totalSubtopics,
      completedSubtopics,
      techPercent,
    };
  }, [dsaProgress, techStack]);

  const topicProgress = useMemo(() => {
    const topics = [
      'Arrays & Strings',
      'HashMaps & Sets',
      'Two Pointers & Sliding Window',
      'Stacks',
      'Binary Search',
      'Linked List',
      'Trees & BST',
      'Heap & Priority Queue',
      'Backtracking & Tries',
      'Graphs & Union Find',
    ];
    return topics.map(topic => ({
      topic,
      ...getTopicProgress(topic, dsaProgress),
    }));
  }, [dsaProgress]);

  const currentPhase = currentMonth <= 6 ? 1 : currentMonth <= 12 ? 2 : 3;
  const phaseColors = ['', 'bg-blue-500', 'bg-cyan-500', 'bg-amber-500'];
  const phaseNames = ['', 'Phase 1: Foundations', 'Phase 2: Scale Up', 'Phase 3: Interview Ready'];
  const monthData = months[currentMonth - 1] || months[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Growth Tracker</h1>
          <p className="text-muted-foreground mt-1">
            7 LPA → 14 LPA | Product-Based MNC Goal
          </p>
        </div>
        <Badge variant="default" className={`${phaseColors[currentPhase]} text-white px-3 py-1 text-sm`}>
          {phaseNames[currentPhase]} (Month {currentMonth})
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card card-emerald">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">DSA Progress</CardTitle>
            <Code2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.solvedProblems}/{stats.totalProblems}</div>
            <Progress value={stats.overallPercent} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{stats.overallPercent}% complete</p>
          </CardContent>
        </Card>

        <Card className="glass-card card-sky">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tech Stack</CardTitle>
            <Cloud className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedSubtopics}/{stats.totalSubtopics}</div>
            <Progress value={stats.techPercent} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{stats.techPercent}% skills learned</p>
          </CardContent>
        </Card>

        <Card className="glass-card card-amber">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Month Focus</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{monthData.dsaFocus.split('(')[0].trim()}</div>
            <p className="text-xs text-muted-foreground mt-1">{monthData.techFocus}</p>
          </CardContent>
        </Card>

        <Card className="glass-card card-rose">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Target</CardTitle>
            <Clock className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17-20 hrs</div>
            <p className="text-xs text-muted-foreground mt-1">~8.5 hrs DSA + ~8.5 hrs Tech</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Detail Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* DSA Breakdown */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              DSA Difficulty Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900">Easy</Badge>
                </span>
                <span className="font-medium">{stats.easySolved} / {stats.totalEasy}</span>
              </div>
              <Progress value={stats.totalEasy > 0 ? (stats.easySolved / stats.totalEasy) * 100 : 0} className="h-2 bg-green-100 dark:bg-green-950" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900">Medium</Badge>
                </span>
                <span className="font-medium">{stats.mediumSolved} / {stats.totalMedium}</span>
              </div>
              <Progress value={stats.totalMedium > 0 ? (stats.mediumSolved / stats.totalMedium) * 100 : 0} className="h-2 bg-yellow-100 dark:bg-yellow-950" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 border-red-200 dark:border-red-900">Hard</Badge>
                </span>
                <span className="font-medium">{stats.hardSolved} / {stats.totalHard}</span>
              </div>
              <Progress value={stats.totalHard > 0 ? (stats.hardSolved / stats.totalHard) * 100 : 0} className="h-2 bg-red-100 dark:bg-red-950" />
            </div>
          </CardContent>
        </Card>

        {/* Topic Progress */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Top DSA Topics Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topicProgress.map(tp => (
              <div key={tp.topic} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate max-w-[200px]">{tp.topic}</span>
                  <span className="text-muted-foreground">{tp.solved}/{tp.total}</span>
                </div>
                <Progress value={tp.percent} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="glass-card card-amber">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            This Month's Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {monthData.milestones.map((milestone, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{milestone}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
