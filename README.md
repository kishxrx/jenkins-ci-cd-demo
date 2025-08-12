DevOps Internship - Task 2:

A Deep Dive into Building a Jenkins CI/CD Pipeline

This document chronicles the journey of setting up a simple CI/CD pipeline for a Node.js application using Jenkins and Docker. The initial task, as outlined by the internship, was straightforward. However, the path to a successful build was fraught with a wide array of real-world technical challenges, from local environment failures to complex cloud configurations.

This README serves as a post-mortem and a log of the immense troubleshooting, debugging, and persistence required to overcome these hurdles.
This is Part 1 of the story.


---

Objective

The core goal was to set up a basic Jenkins pipeline to automate the process of building, testing, and deploying a containerized application.

Tools: Jenkins, Docker

Deliverable: A Jenkinsfile to build and deploy an application.



---

Phase 1: The Local Environment Nightmare (The "Docker on Windows" Problem)

The journey began with an attempt to set up the environment locally on a Windows 10 machine using Docker Desktop with the WSL 2 backend. This immediately led to a series of critical, blocking errors.

The Initial Error: WSL Command Timeout

Docker Desktop was completely unable to communicate with its WSL backend, hanging and eventually crashing with errors like:

> A timeout occurred while executing a WSL command.
checking WSL version: context deadline exceeded



This indicated a fundamental breakdown between the Windows host and the Linux subsystem.

The Troubleshooting Gauntlet

A multi-day effort to resolve this issue involved a cascade of attempted solutions, each revealing a deeper problem:

Standard Resets: Running wsl --shutdown and restarting Docker Desktop did not help.

Forceful Process Killing: Manually ending Docker and vmmem processes in Task Manager to release file locks.

Manual File Deletion: Attempting to delete Docker’s data folders (%APPDATA%\Docker, %LOCALAPPDATA%\Docker) failed due to unkillable background processes locking files and throwing errors like:

> The process cannot access the file...



The "Scorched Earth" Approach: Only a full system reboot followed by immediate manual deletion of files before Docker could restart was successful in cleaning corrupted data.

The C: Drive Revelation: Discovered the C: drive had less than 4GB free, insufficient for Docker’s virtual disk (ext4.vhdx).

The .wslconfig Dead End: Trying to force WSL to use another drive by creating a .wslconfig file failed because the basePath directive is not supported on Windows 10—a final blocker for the local environment.


After days of intense effort, it was clear the local machine’s environment was fundamentally incompatible or broken beyond standard fixes.


---

Phase 2: The Pivot to a Cloud Environment

With the local machine a dead end, the strategy shifted to a cloud-based development environment to bypass local issues entirely. GitHub Codespaces was chosen for its speed and integration.

This pivot was immediately successful: a new codespace was created, providing a stable Linux environment with a working Docker installation. Problems that had blocked progress for days were solved in under five minutes.

The New Challenge: Docker-in-Docker

The relief was short-lived, as a new, more complex set of challenges emerged. The goal was to run Jenkins inside a Docker container, which would then build other Docker containers—a classic Docker-in-Docker scenario.

Initial Setup: Jenkins started in a Docker container using a persistent volume (-v jenkins_home...) to save data.

Plugin Configuration: Installed the Docker Pipeline plugin to allow Jenkins to understand the agent { docker { ... } } syntax in the Jenkinsfile.

The docker: not found Error: The pipeline repeatedly failed with Jenkins reporting that the docker command did not exist inside the container.


The Solution: The Docker Socket

The root cause was that the Jenkins container is isolated from the host Docker engine for security reasons. The fix was to grant access by re-creating the Jenkins container with this crucial option:

-v /var/run/docker.sock:/var/run/docker.sock

This bind-mounts the host’s Docker socket into the Jenkins container, effectively giving Jenkins a direct line to the Docker daemon.

This step required multiple retries due to persistent, baffling failures, involving stopping and removing the old container and starting a new one with the correct settings.


---

A Note on Persistence

This document currently covers the monumental effort required just to get a stable environment and a correctly configured Jenkins server.

The struggle was defined by hitting one wall after another, where each solution only revealed a new, deeper problem.

The journey so far has been a testament to the reality of DevOps work:

> It is often less about writing code and more about the relentless, methodical, and sometimes frustrating process of debugging the complex interactions between tools, operating systems, and environments.




---

This README will be updated with Part 2, covering the debugging and successful execution of the Jenkins pipeline itself.


---

