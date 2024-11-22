import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export function ProjectChart({ data }) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tâches complétées au fil du temps</CardTitle>
          <p className="text-sm text-gray-500">
            Travail effectué sur ce projet
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completedTasks"
                name="Tâches complétées"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}