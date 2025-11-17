"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Globe, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const ipStats = useQuery(api.leaderboard.getUniqueIpStats);

  if (!ipStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-white mt-4">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎮 InnerWords Admin Dashboard
          </h1>
          <p className="text-gray-300">
            Monitor game engagement and user analytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Unique Visitors
              </CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {ipStats.uniqueIpCount}
              </div>
              <p className="text-xs text-gray-400">
                Different IP addresses
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Visits
              </CardTitle>
              <Eye className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {ipStats.totalVisits}
              </div>
              <p className="text-xs text-gray-400">
                Including return visits
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Avg Visits/User
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {ipStats.uniqueIpCount > 0 
                  ? (ipStats.totalVisits / ipStats.uniqueIpCount).toFixed(1)
                  : "0.0"
                }
              </div>
              <p className="text-xs text-gray-400">
                Engagement metric
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Status
              </CardTitle>
              <Globe className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                Live
              </div>
              <p className="text-xs text-gray-400">
                Tracking active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Visitors */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Visitors</CardTitle>
            <CardDescription className="text-gray-400">
              Latest 10 unique IP addresses that played the game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ipStats.recentIps.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No visitor data yet. Play the game to start tracking!
                </p>
              ) : (
                ipStats.recentIps.map((ip, index) => (
                  <div
                    key={ip.ipAddress}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-mono text-sm">
                          {ip.ipAddress}
                        </p>
                        <p className="text-gray-400 text-xs">
                          First visit: {new Date(ip.firstVisit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {ip.visitCount} visit{ip.visitCount !== 1 ? 's' : ''}
                      </Badge>
                      <p className="text-gray-400 text-xs">
                        Last: {new Date(ip.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">📧 Email Notifications</CardTitle>
            <CardDescription className="text-gray-400">
              You'll receive email notifications at <strong>8frwg2pq99@privaterelay.appleid.com</strong> whenever:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>A new score is submitted to the leaderboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Includes player name, score, word, and IP address</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Real-time notifications help you track engagement</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}