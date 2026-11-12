import CodeInputProvider from "../CodeInputContext/CodeInputProvider";
import AIResponseProvider from "../AIResponseContext/AIResponseProvider";

const WorkspaceProviders = ({ children }) => {
  return (
    <CodeInputProvider>
      <AIResponseProvider>
        {children}
      </AIResponseProvider>
    </CodeInputProvider>
  );
};

export default WorkspaceProviders;