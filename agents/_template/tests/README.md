mkdir -p agents/agent-template/{prompts,tools,tests,evaluations}

cat > agents/agent-template/README.md <<'EOF'
# Agent Template

Reusable base template for creating agents in the monorepo.

## Structure
- agent.py: Core agent logic
- config.yaml: Agent configuration
- AGENT.md: Agent instructions and conventions
- prompts/: System prompts
- tools/: Tool documentation and integrations
- tests/: Unit tests
- evaluations/: Agent quality checks

When creating an agent, document its goal, tools, prompts,
memory, evaluations, tests, and changes from this template.
EOF

cat > agents/agent-template/AGENT.md <<'EOF'
# Agent Instructions

1. Define the agent's goal and responsibilities.
2. Validate inputs and handle errors.
3. Use documented tools only.
4. Protect API keys and sensitive information.
5. Document prompts, memory, and configuration.
6. Add tests and evaluations for expected behavior.
7. Record all changes from the base template.
EOF

cat > agents/agent-template/agent.py <<'EOF'
def run_agent(task: str) -> dict:
    """Minimal starting point for a reusable agent."""
    if not isinstance(task, str) or not task.strip():
        raise ValueError("Task must be a non-empty string.")

    return {
        "task": task.strip(),
        "status": "ready",
        "result": None,
    }
EOF

cat > agents/agent-template/config.yaml <<'EOF'
name: agent-template
version: "1.0.0"
description: Reusable base template for monorepo agents
tools: []
memory:
  enabled: false
evaluations:
  enabled: true
EOF

cat > agents/agent-template/prompts/system.md <<'EOF'
# System Prompt

You are a task-focused agent.

Follow the assigned goal and project instructions.
Validate inputs, use authorized tools, protect secrets,
and report results and limitations clearly.
EOF

cat > agents/agent-template/tools/README.md <<'EOF'
# Tools

Document each tool's:
- Purpose
- Inputs and outputs
- Permissions
- Security requirements
- Limitations
- Tests
EOF

cat > agents/agent-template/tests/test_agent.py <<'EOF'
import unittest
from agent import run_agent


class TestAgent(unittest.TestCase):
    def test_valid_task(self):
        result = run_agent("Example task")
        self.assertEqual(result["status"], "ready")
        self.assertEqual(result["task"], "Example task")

    def test_empty_task(self):
        with self.assertRaises(ValueError):
            run_agent(" ")

    def test_invalid_task(self):
        with self.assertRaises(ValueError):
            run_agent(None)


if __name__ == "__main__":
    unittest.main()
EOF

cat > agents/agent-template/evaluations/README.md <<'EOF'
# Evaluations

Document how agent quality is measured:
- Expected behavior
- Success criteria
- Edge cases
- Accuracy and reliability checks
- Evaluation results
EOF

cat > agents/agent-template/requirements.txt <<'EOF'
# Add dependencies only when required.
EOF

cat > agents/agent-template/.env.example <<'EOF'
# Add environment variable names here.
# Never store real API keys or secrets in this file.
EOF

echo "Agent template created in agents/agent-template/"