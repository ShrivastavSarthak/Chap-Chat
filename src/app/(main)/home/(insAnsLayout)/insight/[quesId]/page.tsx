import AggAns from "@/src/components/insightComponent/aggAns";

export default async function AggPage({
  params,
}: {
  params: Promise<{ quesId: string }>;
}) {
  const { quesId } = await params;
  return (
    <div className="w-full h-full  overflow-hidden">
      <AggAns qId={quesId} />
    </div>
  );
}
