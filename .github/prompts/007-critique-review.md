You are reviewing a planning set for adding <TARGET_LANGUAGE> language support to Alloy.

Review the following documents:
- <CORE_DOC>
- <PATTERNS_DOC>
- <DESIGN_DOC>
- <PRD_DOC>
- docs/backlog/*

Your task is to act as a skeptical senior architect and planning reviewer.

Write your review to:

<OUTPUT_DIR>/06-review.md

Produce a markdown document with the following exact sections:

# 1. Overall Assessment
Give a concise assessment of the planning set.

# 2. Strengths
List what is strong and well-grounded.

# 3. Gaps
Identify missing details, missing requirements, missing tasks, or weak areas.

# 4. Ambiguities
Identify unclear wording, assumptions, or decisions that could confuse an implementation agent.

# 5. Architectural Risks
Identify places where the plan may violate Alloy's apparent architecture or overfit to an existing language package.

# 6. Scope Risks
Identify where MVP may be too large, too small, or poorly bounded.

# 7. Testing Risks
Identify weak spots in the testing plan.

# 8. Backlog Risks
Identify tasks that are too large, incorrectly ordered, insufficiently testable, or unsafe for autonomous execution.

# 9. Recommended Corrections
Give concrete recommendations for improving the docs.

# 10. Verdict
Choose one:
- Ready for implementation
- Ready with minor revisions
- Needs substantial revision

Requirements:
- Be specific.
- Ground criticisms in the documents and repo reality where possible.
- Prefer actionable feedback over general commentary.