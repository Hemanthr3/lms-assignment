export default function DiscussionPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Discussion {params.id}</h1>
      <p className="text-muted-foreground">
        Discussion content will be displayed here. Navigate through different
        topics and threads using the sidebar.
      </p>
    </div>
  );
}
