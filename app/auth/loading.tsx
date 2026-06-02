import { Card } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";

export default function AuthLoading() {
  return (
    <Card className="space-y-3">
      <div className="bg-surface-strong h-6 w-44 animate-pulse rounded" />
      <div className="bg-surface-strong h-4 w-full max-w-72 animate-pulse rounded" />
      <div className="bg-surface-strong h-10 w-full animate-pulse rounded" />
      <Loader label="Loading secure authentication..." />
    </Card>
  );
}
