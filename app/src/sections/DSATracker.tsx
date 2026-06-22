import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, CheckCircle2, Circle, ExternalLink, Filter } from 'lucide-react';
import type { DSAProgress } from '@/data/dsaProblems';
import { dsaProblems, dsaTopics, getMonthProgress } from '@/data/dsaProblems';

interface DSATrackerProps {
  progress: DSAProgress;
  setProgress: (progress: DSAProgress) => void;
}

export default function DSATracker({ progress, setProgress }: DSATrackerProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProblem, setEditingProblem] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editWithoutHint, setEditWithoutHint] = useState(false);

  const filteredProblems = dsaProblems.filter(p => {
    const matchTopic = selectedTopic === 'All' || p.topic === selectedTopic;
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMonth = selectedMonth === 'All' || String(p.month) === selectedMonth;
    return matchTopic && matchDiff && matchSearch && matchMonth;
  });

  const toggleSolved = (problemId: string) => {
    const current = progress[problemId];
    if (current?.solved) {
      const updated = { ...progress };
      updated[problemId] = { ...current, solved: false };
      setProgress(updated);
    } else {
      setEditingProblem(problemId);
      setEditNotes(current?.notes || '');
      setEditTime(current?.timeTaken || '');
      setEditWithoutHint(current?.withoutHint || false);
    }
  };

  const saveProblemDetails = () => {
    if (!editingProblem) return;
    const updated = {
      ...progress,
      [editingProblem]: {
        solved: true,
        solvedDate: new Date().toISOString().split('T')[0],
        timeTaken: editTime,
        withoutHint: editWithoutHint,
        notes: editNotes,
      },
    };
    setProgress(updated);
    setEditingProblem(null);
  };

  const markForRevision = (problemId: string, revisionNum: 1 | 2) => {
    const current = progress[problemId];
    if (!current) return;
    const dateKey = revisionNum === 1 ? 'revisionDate1' : 'revisionDate2';
    const updated = {
      ...progress,
      [problemId]: {
        ...current,
        [dateKey]: new Date().toISOString().split('T')[0],
      },
    };
    setProgress(updated);
  };

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200',
  };

  const totalSolved = Object.values(progress).filter(p => p.solved).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DSA Tracker</h1>
          <p className="text-muted-foreground mt-1">{totalSolved} problems solved out of {dsaProblems.length}</p>
        </div>
      </div>

      {/* Month Progress Overview */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map(m => {
          const mp = getMonthProgress(m, progress);
          const isSelected = selectedMonth === String(m);
          return (
            <Card 
              key={m} 
              className={`glass-card cursor-pointer hover:scale-[1.02] transition-all duration-200 ${
                isSelected ? 'ring-2 ring-emerald-500 border-transparent bg-emerald-500/10' : 'card-emerald'
              }`}
              onClick={() => setSelectedMonth(selectedMonth === String(m) ? 'All' : String(m))}
            >
              <CardContent className="p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Month {m}</div>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-xl font-bold">{mp.solved}/{mp.total}</span>
                  <Badge variant={isSelected ? 'default' : 'outline'} className="text-[10px] px-1.5 py-0.5">{mp.percent}%</Badge>
                </div>
                <Progress value={mp.percent} className="mt-2 h-1.5" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Months</SelectItem>
                  <SelectItem value="1">Month 1 (35)</SelectItem>
                  <SelectItem value="2">Month 2 (35)</SelectItem>
                  <SelectItem value="3">Month 3 (30)</SelectItem>
                  <SelectItem value="4">Month 4 (35)</SelectItem>
                  <SelectItem value="5">Month 5 (30)</SelectItem>
                  <SelectItem value="6">Month 6 (25)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Topics</SelectItem>
                  {dsaTopics.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => { setSelectedTopic('All'); setSelectedDifficulty('All'); setSelectedMonth('All'); setSearchQuery(''); }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Problem List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Problems ({filteredProblems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {filteredProblems.map(problem => {
                const p = progress[problem.id];
                const isSolved = p?.solved;
                return (
                  <div
                    key={problem.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      isSolved ? 'bg-green-50/50 border-green-200' : 'bg-card hover:bg-muted/50'
                    }`}
                  >
                    <Checkbox
                      checked={isSolved}
                      onCheckedChange={() => toggleSolved(problem.id)}
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {isSolved ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <span className={`font-medium truncate ${isSolved ? 'line-through text-muted-foreground' : ''}`}>
                          {problem.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 ml-6">
                        <Badge variant="outline" className={`text-xs ${difficultyColors[problem.difficulty as keyof typeof difficultyColors] || ''}`}>
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-blue-50/50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          Month {problem.month}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">{problem.topic}</Badge>
                        {p?.solvedDate && (
                          <span className="text-xs text-muted-foreground">Solved: {p.solvedDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {problem.leetcode && (
                        <a
                          href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors"
                          title="Open on LeetCode"
                        >
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{problem.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              <Badge className={difficultyColors[problem.difficulty as keyof typeof difficultyColors] || ''}>{problem.difficulty}</Badge>
                              <Badge variant="outline" className="text-xs bg-blue-50/50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">Month {problem.month}</Badge>
                              <Badge variant="secondary">{problem.topic}</Badge>
                            </div>
                            {p?.solved ? (
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Solved on:</span>
                                  <span className="font-medium">{p.solvedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Time taken:</span>
                                  <span className="font-medium">{p.timeTaken || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Without hint:</span>
                                  <span className="font-medium">{p.withoutHint ? 'Yes' : 'No'}</span>
                                </div>
                                {p.revisionDate1 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Revision 1:</span>
                                    <span className="font-medium">{p.revisionDate1}</span>
                                  </div>
                                )}
                                {p.revisionDate2 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Revision 2:</span>
                                    <span className="font-medium">{p.revisionDate2}</span>
                                  </div>
                                )}
                                {p.notes && (
                                  <div className="pt-2 border-t">
                                    <span className="text-muted-foreground">Notes:</span>
                                    <p className="mt-1">{p.notes}</p>
                                  </div>
                                )}
                                <div className="flex gap-2 pt-2">
                                  <Button size="sm" variant="outline" onClick={() => markForRevision(problem.id, 1)}>
                                    Mark Rev 1
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => markForRevision(problem.id, 2)}>
                                    Mark Rev 2
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Not solved yet. Click the checkbox to mark as solved.</p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Problem Dialog */}
      {editingProblem && (
        <Dialog open={!!editingProblem} onOpenChange={() => setEditingProblem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dsaProblems.find(p => p.id === editingProblem)?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="withoutHint"
                  checked={editWithoutHint}
                  onCheckedChange={(v) => setEditWithoutHint(v as boolean)}
                />
                <Label htmlFor="withoutHint">Solved without hint?</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeTaken">Time taken</Label>
                <Input
                  id="timeTaken"
                  placeholder="e.g., 15 min"
                  value={editTime}
                  onChange={e => setEditTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes / Pattern observed</Label>
                <Textarea
                  id="notes"
                  placeholder="What pattern or trick did you learn?"
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                />
              </div>
              <Button onClick={saveProblemDetails} className="w-full">
                Save Progress
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
