export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Quiz {params.id}</h1>
      <p className="text-muted-foreground">
        Quiz content will be displayed here. Click on items in the sidebar to
        navigate between questions.
      </p>
    </div>
  );
}
