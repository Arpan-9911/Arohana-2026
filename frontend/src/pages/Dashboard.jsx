import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import EntryPassModal from "../components/EntryPassModal";

// Mock Dashboard Data
const mockDashboardData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "approved", // pending | approved | rejected
    totalEvents: 3,
  },
  participations: [
    {
      id: "p1",
      society: "Digital Frontier",
      eventName: "CodeBlitz",
      eventType: "team",
      teamCode: "YAKYFV",
      requiresSubmission: true,
      submitted: false,
    },
    {
      id: "p2",
      society: "TechWhiz",
      eventName: "UI/UX Challenge",
      eventType: "solo",
      teamCode: null,
      requiresSubmission: false,
      submitted: true,
    },
    {
      id: "p3",
      society: "Data Wizards",
      eventName: "Analytics Sprint",
      eventType: "team",
      teamCode: "DATAWIZ",
      requiresSubmission: true,
      submitted: true,
    },
  ],
};

//STATUS BADGE COMPONENT
const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      bg: "bg-green-500/20",
      border: "border-green-500/50",
      text: "text-green-400",
      label: "Approved",
    },
    pending: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/50",
      text: "text-yellow-400",
      label: "Pending",
    },
    rejected: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      text: "text-red-400",
      label: "Rejected",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className="min-h-dvh
      bg-[radial-gradient(circle_at_top,#d624c7,#070313_80%)]
      flex items-center justify-center
      p-6 text-lemon-chiffon
      relative overflow-hidden">
    </div>
  )
}
