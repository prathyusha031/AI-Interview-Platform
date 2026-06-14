function FeedbackCard({ feedback }) {
  return (
    <div className="card">
      <h2>AI Feedback</h2>
      <pre>{feedback}</pre>
    </div>
  );
}

export default FeedbackCard;