import { Octokit } from "@octokit/rest";

interface RunWorkflowOptions {
  owner: string; // GitHub 레포지토리 소유자
  repo: string; // GitHub 레포지토리 이름
  workflowId: string; // workflow 파일 이름 (예: 'schedule.yml')
  token: string; // GitHub Personal Access Token
  ref?: string; // 실행할 브랜치 (기본값: 'main')
}

export async function runWorkflow({
  owner,
  repo,
  workflowId,
  token,
  ref = "main",
}: RunWorkflowOptions): Promise<void> {
  try {
    const octokit = new Octokit({
      auth: token,
    });

    // workflow 실행
    const response = await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflowId,
      ref,
    });

    if (response.status === 204) {
      console.log("Workflow triggered successfully");
    } else {
      throw new Error(`Failed to trigger workflow: ${response.status}`);
    }
  } catch (error) {
    console.error("Error triggering workflow:", error);
    throw error;
  }
}
