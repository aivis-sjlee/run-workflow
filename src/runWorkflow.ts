import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

export async function runWorkflow(ref: "prod" | "dev") {
  // GitHub 레포지토리 정보
  const owner = "AIVIS-inc"; // 레포지토리 소유자
  const repo = "Homepage-V2"; // 레포지토리 이름
  const workflow_id = "schedule.yml"; // 실행할 워크플로우 파일 이름 또는 ID

  try {
    const response = await octokit.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref: ref === "prod" ? "main" : "develop",
      inputs: {
        environment: ref,
      },
    });

    console.log("Workflow triggered successfully:", response.status);
  } catch (error) {
    console.error("Error triggering workflow:", error);
  }
}
