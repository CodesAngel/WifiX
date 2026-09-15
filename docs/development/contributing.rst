Contributing
============

Contributions are welcome. Keep changes focused, test the affected workflow,
and update documentation when behavior changes.

Recommended Workflow
--------------------

1. Create a feature branch.
2. Make focused changes.
3. Run the relevant frontend, backend, or Android build.
4. Update docs and changelog entries.
5. Open a pull request with clear notes and test results.

Development Areas
-----------------

- Python backend: ``backend/``
- Rust mobile backend: ``crates/``
- Shared React UI: ``frontend/react/src/``
- Desktop Tauri wrapper: ``frontend/react/src-tauri/``
- Mobile Tauri wrapper: ``frontend/react/mobile/src-tauri/``

Before Submitting
-----------------

- Confirm desktop behavior if you changed shared React code.
- Confirm mobile behavior if you changed shared React code.
- Avoid committing generated build artifacts.
- Keep release assets attached to GitHub Releases rather than tracked in Git.
