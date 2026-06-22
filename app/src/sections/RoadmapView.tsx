import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { phases, months, weeklySchedule } from '@/data/roadmap';
import { Calendar, ChevronRight, Clock, Target, TrendingUp, BookOpen, Code2 } from 'lucide-react';

interface RoadmapViewProps {
  currentMonth: number;
  setCurrentMonth: (m: number) => void;
}

export default function RoadmapView({ currentMonth, setCurrentMonth }: RoadmapViewProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const getPhaseForMonth = (month: number) => {
    if (month <= 6) return phases[0];
    if (month <= 12) return phases[1];
    return phases[2];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">18-Month Roadmap</h1>
        <p className="text-muted-foreground mt-1">7 LPA → 14 LPA | Product-Based MNC</p>
      </div>

      {/* Phase Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {phases.map(phase => (
          <Card
            key={phase.id}
            className="glass-card cursor-pointer transition-all"
            style={{ borderTop: `4px solid ${phase.color}` }}
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{phase.name}</CardTitle>
                <ChevronRight className={`h-4 w-4 transition-transform ${expandedPhase === phase.id ? 'rotate-90' : ''}`} />
              </div>
              <p className="text-xs text-muted-foreground">Month {phase.monthStart}-{phase.monthEnd}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{phase.dsaTarget}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Target: {phase.exitSalary}</span>
              </div>
              {expandedPhase === phase.id && (
                <div className="pt-2 border-t space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Key Goals:</p>
                  {phase.goals.map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: phase.color }} />
                      <span className="text-xs">{goal}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Month Selector */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {months.map(m => {
              const phase = getPhaseForMonth(m.month);
              const isCurrent = m.month === currentMonth;
              return (
                <button
                  key={m.month}
                  onClick={() => setCurrentMonth(m.month)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isCurrent
                      ? 'ring-2 ring-offset-1'
                      : 'hover:bg-muted'
                  }`}
                  style={{
                    backgroundColor: isCurrent ? phase.color : undefined,
                    color: isCurrent ? 'white' : undefined,
                    outline: isCurrent ? `2px solid ${phase.color}` : undefined,
                    outlineOffset: '1px',
                  }}
                  title={m.monthName}
                >
                  M{m.month}
                </button>
              );
            })}
          </div>

          {/* Selected Month Detail */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{months[currentMonth - 1]?.monthName}</h3>
              <Badge style={{ backgroundColor: getPhaseForMonth(currentMonth).color }}>
                {getPhaseForMonth(currentMonth).name}
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Code2 className="h-4 w-4 text-primary" />
                  DSA Focus
                </div>
                <p className="text-sm text-muted-foreground">{months[currentMonth - 1]?.dsaFocus}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Tech Focus
                </div>
                <p className="text-sm text-muted-foreground">{months[currentMonth - 1]?.techFocus}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Milestones:</div>
              <div className="flex flex-wrap gap-2">
                {months[currentMonth - 1]?.milestones.map((m, i) => (
                  <Badge key={i} variant="outline" className="bg-background">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Weekly Study Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Day</th>
                  <th className="text-left py-3 px-2 font-medium">Office</th>
                  <th className="text-center py-3 px-2 font-medium text-blue-600">DSA Time</th>
                  <th className="text-center py-3 px-2 font-medium text-sky-600">Tech Time</th>
                  <th className="text-right py-3 px-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {weeklySchedule.map((day, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{day.day}</td>
                    <td className="py-3 px-2 text-muted-foreground">{day.office}</td>
                    <td className="py-3 px-2 text-center text-blue-600 font-medium">{day.dsaTime}</td>
                    <td className="py-3 px-2 text-center text-sky-600 font-medium">{day.techTime}</td>
                    <td className="py-3 px-2 text-right font-bold">{day.totalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm text-blue-800 dark:text-blue-300">
            <strong>Weekly Total:</strong> ~17-20 hours (~8.5 hrs DSA + ~8.5 hrs Tech)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
