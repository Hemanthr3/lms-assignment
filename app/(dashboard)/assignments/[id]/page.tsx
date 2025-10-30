export default function AssignmentPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Assignment {params.id}</h1>
      <p className="text-muted-foreground">
        Assignment content will be displayed here. Use the sidebar to navigate
        through different parts, instructions, and submission requirements.
      </p>
    </div>
  );
}
