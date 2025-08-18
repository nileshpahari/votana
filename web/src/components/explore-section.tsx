"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, TrendingUp, Clock, Users, Vote, Calendar, CheckCircle } from "lucide-react"

// Dummy data for polls
const dummyPolls = [
  {
    id: 1,
    title: "Should Solana implement a new governance token?",
    description: "A proposal to introduce a new governance mechanism for better decentralization",
    category: "Governance",
    status: "active",
    endDate: "2024-01-15",
    totalVotes: 1247,
    options: [
      { name: "Yes, implement it", votes: 823, percentage: 66 },
      { name: "No, keep current system", votes: 424, percentage: 34 },
    ],
    creator: "7xKX...gAsU",
    trending: true,
  },
  {
    id: 2,
    title: "Community Fund Allocation for Q1 2024",
    description: "Decide how to allocate the 500,000 SOL community development fund",
    category: "Treasury",
    status: "active",
    endDate: "2024-01-20",
    totalVotes: 892,
    options: [
      { name: "Developer Grants (40%)", votes: 356, percentage: 40 },
      { name: "Marketing (30%)", votes: 268, percentage: 30 },
      { name: "Infrastructure (20%)", votes: 178, percentage: 20 },
      { name: "Reserve (10%)", votes: 90, percentage: 10 },
    ],
    creator: "9mNp...kLmQ",
    trending: true,
  },
  {
    id: 3,
    title: "New DeFi Protocol Integration",
    description: "Vote on integrating a new cross-chain DeFi protocol",
    category: "DeFi",
    status: "ended",
    endDate: "2024-01-10",
    totalVotes: 2156,
    options: [
      { name: "Approve Integration", votes: 1512, percentage: 70 },
      { name: "Reject Integration", votes: 644, percentage: 30 },
    ],
    creator: "4bTy...nRsP",
    trending: false,
  },
  {
    id: 4,
    title: "Validator Commission Rate Adjustment",
    description: "Proposal to adjust the maximum validator commission rate",
    category: "Network",
    status: "active",
    endDate: "2024-01-25",
    totalVotes: 567,
    options: [
      { name: "Reduce to 5%", votes: 340, percentage: 60 },
      { name: "Keep at 10%", votes: 227, percentage: 40 },
    ],
    creator: "2kLm...vBnH",
    trending: false,
  },
]

export function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "ended">("all")

  const filteredPolls = dummyPolls.filter((poll) => {
    const matchesSearch =
      poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || poll.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-yellow text-black border-2 border-black"
      case "ended":
        return "bg-gray-300 text-black border-2 border-black"
      default:
        return "bg-blue text-white border-2 border-black"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-8 bg-white min-h-screen p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-mono text-black uppercase tracking-tight">EXPLORE POLLS</h1>
          <p className="text-gray-600 mt-2 font-mono text-sm uppercase tracking-wide">
            DISCOVER • PARTICIPATE • GOVERN
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-red text-white border-2 border-black shadow-brutal font-mono font-bold uppercase gap-2">
            <TrendingUp className="h-3 w-3" />
            24 ACTIVE POLLS
          </Badge>
          <Badge className="bg-blue text-white border-2 border-black shadow-brutal font-mono font-bold uppercase gap-2">
            <Users className="h-3 w-3" />
            3.2K PARTICIPANTS
          </Badge>
        </div>
      </div>

      <Card className="brutalist-card bg-white border-black shadow-brutal">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
              <Input
                placeholder="SEARCH POLLS BY TITLE OR DESCRIPTION..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 brutalist-input font-mono font-bold uppercase bg-white border-2 border-black shadow-brutal"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                size="sm"
                className={`brutalist-button font-mono font-bold uppercase ${
                  selectedFilter === "all" ? "bg-red text-white shadow-brutal" : "brutalist-button-outline"
                }`}
              >
                ALL
              </Button>
              <Button
                variant={selectedFilter === "active" ? "default" : "outline"}
                onClick={() => setSelectedFilter("active")}
                size="sm"
                className={`gap-2 brutalist-button font-mono font-bold uppercase ${
                  selectedFilter === "active" ? "bg-yellow text-black shadow-brutal" : "brutalist-button-outline"
                }`}
              >
                <Clock className="h-3 w-3" />
                ACTIVE
              </Button>
              <Button
                variant={selectedFilter === "ended" ? "default" : "outline"}
                onClick={() => setSelectedFilter("ended")}
                size="sm"
                className={`gap-2 brutalist-button font-mono font-bold uppercase ${
                  selectedFilter === "ended" ? "bg-gray-400 text-black shadow-brutal" : "brutalist-button-outline"
                }`}
              >
                <CheckCircle className="h-3 w-3" />
                ENDED
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-red" />
          <h2 className="text-2xl font-bold font-mono text-black uppercase tracking-tight">TRENDING NOW</h2>
          <div className="flex-1 h-1 bg-red"></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredPolls
            .filter((poll) => poll.trending)
            .map((poll) => (
              <Card
                key={poll.id}
                className="brutalist-card bg-white border-black shadow-brutal hover:shadow-brutal-hover transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-blue text-white border-2 border-black font-mono font-bold uppercase">
                          {poll.category.toUpperCase()}
                        </Badge>
                        <Badge className={`font-mono font-bold uppercase ${getStatusColor(poll.status)}`}>
                          {poll.status.toUpperCase()}
                        </Badge>
                        {poll.trending && (
                          <Badge className="bg-red text-white border-2 border-black font-mono font-bold uppercase gap-1">
                            <TrendingUp className="h-3 w-3" />
                            HOT
                          </Badge>
                        )}
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
                    {poll.options.map((option, index) => (
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
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold font-mono text-black uppercase tracking-tight">ALL POLLS</h2>
          <div className="flex-1 h-1 bg-black"></div>
        </div>

        <div className="grid gap-4">
          {filteredPolls.map((poll) => (
            <Card
              key={poll.id}
              className="brutalist-card bg-white border-black shadow-brutal hover:shadow-brutal-hover transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue text-white border-2 border-black font-mono font-bold uppercase">
                        {poll.category.toUpperCase()}
                      </Badge>
                      <Badge className={`font-mono font-bold uppercase ${getStatusColor(poll.status)}`}>
                        {poll.status.toUpperCase()}
                      </Badge>
                      {poll.trending && (
                        <Badge className="bg-red text-white border-2 border-black font-mono font-bold uppercase gap-1">
                          <TrendingUp className="h-3 w-3" />
                          HOT
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-mono font-bold text-lg mb-1 text-black uppercase">{poll.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1 font-sans">{poll.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-700 font-mono font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {poll.totalVotes.toLocaleString()} VOTES
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        ENDS {formatDate(poll.endDate).toUpperCase()}
                      </span>
                      <span className="font-mono">BY {poll.creator}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-black uppercase">
                        LEADING: {poll.options[0].name}
                      </div>
                      <div className="text-xs text-gray-600 font-bold font-mono uppercase">
                        {poll.options[0].percentage}% ({poll.options[0].votes} VOTES)
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className={`brutalist-button font-mono font-bold uppercase border-2 border-black shadow-brutal ${
                        poll.status === "ended" ? "bg-gray-300 text-black" : "bg-yellow text-black"
                      }`}
                      disabled={poll.status === "ended"}
                    >
                      <Vote className="h-3 w-3 mr-1" />
                      {poll.status === "ended" ? "VIEW" : "VOTE"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
