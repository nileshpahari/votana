"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, BarChart3, Users, Calendar, Vote, TrendingUp, Clock, Edit, Trash2, Eye } from "lucide-react"

// Dummy data for user's created proposals
const userProposals = [
  {
    id: 1,
    title: "Increase Block Rewards for Validators",
    description: "Proposal to increase validator rewards to improve network security and decentralization",
    category: "Network",
    status: "active",
    createdDate: "2024-01-05",
    endDate: "2024-01-18",
    totalVotes: 1847,
    options: [
      { name: "Increase by 15%", votes: 1108, percentage: 60 },
      { name: "Increase by 10%", votes: 554, percentage: 30 },
      { name: "Keep current rate", votes: 185, percentage: 10 },
    ],
    views: 3420,
    engagement: 54,
  },
  {
    id: 2,
    title: "Community Event Funding",
    description: "Allocate funds for organizing Solana community meetups worldwide",
    category: "Community",
    status: "active",
    createdDate: "2024-01-08",
    endDate: "2024-01-22",
    totalVotes: 892,
    options: [
      { name: "Approve 100K SOL", votes: 623, percentage: 70 },
      { name: "Approve 50K SOL", votes: 178, percentage: 20 },
      { name: "Reject funding", votes: 91, percentage: 10 },
    ],
    views: 1850,
    engagement: 48,
  },
  {
    id: 3,
    title: "NFT Marketplace Integration",
    description: "Integrate a new NFT marketplace with lower fees for creators",
    category: "DeFi",
    status: "ended",
    createdDate: "2023-12-20",
    endDate: "2024-01-03",
    totalVotes: 2156,
    options: [
      { name: "Approve integration", votes: 1512, percentage: 70 },
      { name: "Reject integration", votes: 644, percentage: 30 },
    ],
    views: 4200,
    engagement: 51,
  },
  {
    id: 4,
    title: "Developer Grant Program Expansion",
    description: "Expand the developer grant program to include more categories",
    category: "Development",
    status: "draft",
    createdDate: "2024-01-12",
    endDate: "2024-01-30",
    totalVotes: 0,
    options: [
      { name: "Expand to 10 categories", votes: 0, percentage: 0 },
      { name: "Expand to 5 categories", votes: 0, percentage: 0 },
      { name: "Keep current structure", votes: 0, percentage: 0 },
    ],
    views: 0,
    engagement: 0,
  },
]

export function DashboardSection() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "proposals">("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground"
      case "ended":
        return "bg-muted text-muted-foreground"
      case "draft":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const activeProposals = userProposals.filter((p) => p.status === "active").length
  const totalVotes = userProposals.reduce((sum, p) => sum + p.totalVotes, 0)
  const totalViews = userProposals.reduce((sum, p) => sum + p.views, 0)
  const avgEngagement = Math.round(userProposals.reduce((sum, p) => sum + p.engagement, 0) / userProposals.length)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-mono text-black uppercase tracking-tight">DASHBOARD</h1>
          <p className="text-gray-600 mt-2 font-mono text-sm uppercase tracking-wide">MANAGE • TRACK • GOVERN</p>
        </div>

        <Button className="brutalist-button bg-red text-white font-mono font-bold uppercase tracking-wide gap-2 shadow-brutal">
          <Plus className="h-4 w-4" />
          CREATE PROPOSAL
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={selectedTab === "overview" ? "default" : "outline"}
          onClick={() => setSelectedTab("overview")}
          className={`gap-2 font-mono font-bold uppercase tracking-wide ${
            selectedTab === "overview"
              ? "brutalist-button bg-blue text-white shadow-brutal"
              : "brutalist-button-outline"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          OVERVIEW
        </Button>
        <Button
          variant={selectedTab === "proposals" ? "default" : "outline"}
          onClick={() => setSelectedTab("proposals")}
          className={`gap-2 font-mono font-bold uppercase tracking-wide ${
            selectedTab === "proposals"
              ? "brutalist-button bg-blue text-white shadow-brutal"
              : "brutalist-button-outline"
          }`}
        >
          <Vote className="h-4 w-4" />
          MY PROPOSALS
        </Button>
      </div>

      {selectedTab === "overview" ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="brutalist-card bg-yellow border-black shadow-brutal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono font-bold text-black uppercase tracking-wide">
                  ACTIVE PROPOSALS
                </CardTitle>
                <Clock className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold text-black">{activeProposals}</div>
                <p className="text-xs text-gray-700 font-mono font-bold uppercase">+2 FROM LAST MONTH</p>
              </CardContent>
            </Card>

            <Card className="brutalist-card bg-red border-black shadow-brutal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono font-bold text-white uppercase tracking-wide">
                  TOTAL VOTES
                </CardTitle>
                <Users className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold text-white">{totalVotes.toLocaleString()}</div>
                <p className="text-xs text-red-100 font-mono font-bold uppercase">+12% FROM LAST MONTH</p>
              </CardContent>
            </Card>

            <Card className="brutalist-card bg-blue border-black shadow-brutal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono font-bold text-white uppercase tracking-wide">
                  TOTAL VIEWS
                </CardTitle>
                <Eye className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold text-white">{totalViews.toLocaleString()}</div>
                <p className="text-xs text-blue-100 font-mono font-bold uppercase">+8% FROM LAST MONTH</p>
              </CardContent>
            </Card>

            <Card className="brutalist-card bg-white border-black shadow-brutal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono font-bold text-black uppercase tracking-wide">
                  AVG. ENGAGEMENT
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold text-black">{avgEngagement}%</div>
                <p className="text-xs text-gray-700 font-mono font-bold uppercase">+3% FROM LAST MONTH</p>
              </CardContent>
            </Card>
          </div>

          <Card className="brutalist-card bg-white border-black shadow-brutal">
            <CardHeader>
              <CardTitle className="font-mono text-xl font-bold text-black uppercase tracking-tight">
                RECENT ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProposals.slice(0, 3).map((proposal) => (
                  <div
                    key={proposal.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-black shadow-brutal"
                  >
                    <div className="w-3 h-3 bg-red border border-black"></div>
                    <div className="flex-1">
                      <p className="font-mono font-bold text-black">{proposal.title}</p>
                      <p className="text-sm text-gray-600 font-mono font-bold uppercase">
                        {proposal.totalVotes} VOTES • CREATED {formatDate(proposal.createdDate).toUpperCase()}
                      </p>
                    </div>
                    <Badge
                      className={`font-mono font-bold uppercase tracking-wide border-2 border-black ${
                        proposal.status === "active"
                          ? "bg-yellow text-black"
                          : proposal.status === "ended"
                            ? "bg-gray-300 text-black"
                            : "bg-blue text-white"
                      }`}
                    >
                      {proposal.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          {userProposals.map((proposal) => (
            <Card
              key={proposal.id}
              className="brutalist-card bg-white border-black shadow-brutal hover:shadow-brutal-hover transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue text-white border-2 border-black font-mono font-bold uppercase">
                        {proposal.category.toUpperCase()}
                      </Badge>
                      <Badge
                        className={`font-mono font-bold uppercase tracking-wide border-2 border-black ${
                          proposal.status === "active"
                            ? "bg-yellow text-black"
                            : proposal.status === "ended"
                              ? "bg-gray-300 text-black"
                              : "bg-red text-white"
                        }`}
                      >
                        {proposal.status.toUpperCase()}
                      </Badge>
                    </div>

                    <h3 className="font-mono font-bold text-xl mb-2 text-black uppercase">{proposal.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-sans">{proposal.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-700 font-mono font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {proposal.totalVotes.toLocaleString()} VOTES
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {proposal.views.toLocaleString()} VIEWS
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        CREATED {formatDate(proposal.createdDate).toUpperCase()}
                      </span>
                      {proposal.status !== "draft" && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {proposal.engagement}% ENGAGEMENT
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="lg:w-80">
                    {proposal.status !== "draft" && proposal.totalVotes > 0 && (
                      <div className="space-y-3 mb-4">
                        <h4 className="font-mono font-bold text-sm text-black uppercase tracking-wide">
                          CURRENT RESULTS
                        </h4>
                        {proposal.options.slice(0, 2).map((option, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-black font-mono font-bold">{option.name}</span>
                              <span className="text-black font-mono font-bold">{option.percentage}%</span>
                            </div>
                            <Progress value={option.percentage} className="h-3 bg-gray-200 border-2 border-black" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 brutalist-button-outline font-mono font-bold uppercase bg-transparent"
                      >
                        <Eye className="h-3 w-3" />
                        VIEW
                      </Button>
                      {proposal.status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 brutalist-button-outline font-mono font-bold uppercase bg-transparent"
                        >
                          <Edit className="h-3 w-3" />
                          EDIT
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 bg-red text-white border-2 border-black shadow-brutal hover:shadow-brutal-hover font-mono font-bold uppercase"
                      >
                        <Trash2 className="h-3 w-3" />
                        DELETE
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
