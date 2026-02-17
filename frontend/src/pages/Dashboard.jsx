import { useState } from "react";
import { useUserStore } from "../store/user.store";

import GlowBackground from "../components/dashboard/GlowBackground";
import ProfileCard from "../components/dashboard/ProfileCard";
import OperationsSection from "../components/dashboard/OperationsSection";
import EntryPassModal from "../components/dashboard/EntryPassModal";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();

  return (
    <div className="relative min-h-screen text-white">
      <GlowBackground />

      <main className="max-w-7xl mx-auto px-3 pt-32 pb-20 space-y-20">
        <ProfileCard onViewPass={() => setIsOpen(true)} user={user} />
        <EntryPassModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
        />

        <OperationsSection />
      </main>
    </div>
  );
}