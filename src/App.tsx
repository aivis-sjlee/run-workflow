import "./App.css";

import { runWorkflow } from "./runWorkflow";

function App() {
  // async/await 방식
  async function triggerWorkflow(ref: "prod" | "dev") {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      alert("GitHub 토큰이 설정되지 않았습니다. .env 파일을 확인해주세요.");
      return;
    }

    const inputPassword = prompt("비밀번호를 입력해주세요.");

    if (inputPassword !== import.meta.env.VITE_PASSWORD) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await runWorkflow(ref);

      alert("Workflow가 성공적으로 실행되었습니다.");
    } catch (error) {
      console.error("오류 발생:", error);
      if (error instanceof Error && error.message.includes("404")) {
        alert(
          "레포지토리를 찾을 수 없습니다. 레포지토리 이름과 접근 권한을 확인해주세요."
        );
      } else if (error instanceof Error && error.message.includes("401")) {
        alert("인증 오류가 발생했습니다. GitHub 토큰을 확인해주세요.");
      } else {
        alert(
          `오류 발생: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  }

  return (
    <div className="App">
      <button onClick={() => triggerWorkflow("prod")}>Prod</button>
      <button onClick={() => triggerWorkflow("dev")}>Dev</button>
    </div>
  );
}

export default App;
