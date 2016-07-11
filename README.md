# ansible-devops-tool
An Ansible-based DevOps tool useful for deployments, server maintenance/monitoring, and any other task that should be automated.

The project relies on the following technologies:
* Angular.js (1.x)
* Ansible
* Socket.IO
* Express
TODO - list all with links

## Before you begin...

Ansible requires a Linux server.  However, you can still issue remote commands to both Linux and Windows (with the help of WinRM + support libraries) remote servers.

For simplicity, I am assuming you have a fresh Ubuntu 14.04 server.

## Installation

### Install Ansible on your remote server

From the Ansible Website, here is a list of commands for fetching the latest release of Ansible on Ubuntu:
* `$ sudo apt-get install software-properties-common`
* `$ sudo apt-add-repository ppa:ansible/ansible`
* `$ sudo apt-get update`
* `$ sudo apt-get install ansible`

Verify your installed Ansible version is the latest version (2.1.0.0):
* `ansible --version`

### Project Installation

Clone the repository onto a Linux server.
Run `npm install` inside the root directory of the cloned repository to install the Node.js packages you will need to run the server-side application and public dashboard.

TODO

## Setup & Configuration

TODO

### Usage

TODO

