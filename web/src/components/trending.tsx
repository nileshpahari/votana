import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Calendar } from "lucide-react";
import { Vote } from "lucide-react";
import { getStatusColor } from "@/lib/getStatusColor";
import { formatDate } from "@/lib/formatDate";

export function Trending({ polls }: { polls: any[] }) {
    return (
        <div>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-red" />
          <h2 className="text-2xl font-bold font-mono text-black uppercase tracking-tight">TRENDING NOW</h2>
          <div className="flex-1 h-1 bg-red"></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {polls
            .map((poll: any) => (
              <Card
                key={poll.id}
                className="brutalist-card bg-white border-black shadow-brutal hover:shadow-brutal-hover transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`font-mono font-bold uppercase ${getStatusColor(poll.status)}`}>
                          {poll.status.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-mono font-bold leading-tight text-black uppercase">
                        {poll.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 font-sans">{poll.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {poll.options.map((option: any, index: any) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-mono font-bold text-black">{option.name}</span>
                          <span className="text-black font-bold font-mono">
                            {option.votes} VOTES ({option.percentage}%)
                          </span>
                        </div>
                        <Progress value={option.percentage} className="h-3 bg-gray-200 border-2 border-black" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1 font-mono font-bold uppercase">
                        <Users className="h-3 w-3" />
                        {poll.totalVotes.toLocaleString()} VOTES
                      </span>
                      <span className="flex items-center gap-1 font-mono font-bold uppercase">
                        <Calendar className="h-3 w-3" />
                        ENDS {formatDate(poll.endDate).toUpperCase()}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      className={`brutalist-button font-mono font-bold uppercase border-2 border-black shadow-brutal ${
                        poll.status === "ended" ? "bg-gray-300 text-black" : "bg-yellow text-black"
                      }`}
                      disabled={poll.status === "ended"}
                    >
                      <Vote className="h-3 w-3 mr-1" />
                      {poll.status === "ended" ? "ENDED" : "VOTE NOW"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>)}