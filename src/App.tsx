import "./App.css";

import { runWorkflow } from "./runWorkflow";

function App() {
  // async/await 방식
  async function triggerWorkflow() {
    try {
      await runWorkflow({
        owner: "AIVIS-inc",
        repo: "Homepage-V2",
        workflowId: "schedule.yml",
        token: import.meta.env.VITE_GITHUB_TOKEN || "",
      });
      alert("Workflow triggered successfully");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  const handleRunWorkflow = () => {
    triggerWorkflow();
  };

  return (
    <div className="App">
      <button onClick={handleRunWorkflow}>Run Workflow</button>
    </div>
  );
}

export default App;
