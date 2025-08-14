# Code-vuln-scan

## Overview

This repository contains a GitHub Actions workflow for performing Static Application Security Testing (SAST) on a simple codebase using CodeQL.
The actual codebase is a Node.js application with 2 vulnerabilities: one is a SQL injection vulnerability and the other is a cross-site scripting (XSS) vulnerability.

## Workflow

The workflow is defined in the `.github/workflows/sast-pipeline.yml` file and consists of the following steps:

1. **Checkout the repository**: The workflow checks out the code from the repository with `actions/checkout@v4`.
2. **Initialize CodeQL**: The workflow initializes the CodeQL analysis with `github/codeql-action/init@v3`.
3. **Autobuild**: The workflow automatically builds the codebase with `github/codeql-action/autobuild@v3`.
4. **Perform CodeQL Analysis**: The workflow performs the CodeQL analysis and generates a SARIF report with `github/codeql-action/analyze@v3`.
5. **Upload scan results**: The workflow uploads the scan results as an artifact with `actions/upload-artifact@v4`.

## Results

The results of the SAST analysis can be found in the `codeql-results` artifact.
