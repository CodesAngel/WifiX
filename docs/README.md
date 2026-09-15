---
orphan: true
---

# WifiX Documentation

This directory contains the Sphinx documentation published on Read the Docs.
The docs cover installation, release downloads, desktop/mobile workflows,
configuration, troubleshooting, and contributor guidance.

## Structure

```text
docs/
├── conf.py
├── index.rst
├── requirements.txt
├── user-guide/
│   ├── installation.rst
│   ├── quickstart.rst
│   ├── releases.rst
│   ├── configuration.rst
│   ├── host-workflow.rst
│   ├── client-workflow.rst
│   ├── features.rst
│   └── security.rst
├── api/
├── development/
├── troubleshooting.rst
├── faq.rst
├── changelog.rst
└── license.rst
```

## Build Locally

From the repository root:

```powershell
cd docs
python -m pip install -r requirements.txt
.\make.bat html
```

The generated site is written to:

```text
docs/_build/html/index.html
```

On Linux or macOS:

```bash
cd docs
python -m pip install -r requirements.txt
make html
```

## Read the Docs

Read the Docs uses the root `.readthedocs.yaml` file:

```yaml
version: 2

build:
  os: ubuntu-24.04
  tools:
    python: "3.13"

python:
  install:
    - requirements: docs/requirements.txt

sphinx:
  configuration: docs/conf.py
```

Builds are triggered when changes are pushed to the configured branch or when a
release tag is created, depending on the Read the Docs project settings.

## Documentation Standards

- Keep instructions current with the actual desktop and Android build outputs.
- Use Windows PowerShell examples when documenting Windows-specific commands.
- Use short sections, direct language, and copy-ready commands.
- Avoid documenting generated build output unless users need the path.
- Update `docs/user-guide/releases.rst` when release artifact names change.
- Run a local Sphinx build before publishing documentation changes.

## Common Checks

```powershell
cd docs
.\make.bat html
```

Optional strict build:

```powershell
cd docs
sphinx-build -b html -W . _build/html
```

If Read the Docs fails, check:

- `.readthedocs.yaml` syntax.
- `docs/requirements.txt` dependencies.
- Missing files referenced by `index.rst` toctrees.
- Invalid reStructuredText formatting.

## Links

- Repository: https://github.com/mehmoodulhaq570/WifiX
- Issues: https://github.com/mehmoodulhaq570/WifiX/issues
- Read the Docs: https://wifix.readthedocs.io
