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

* Install git: `sudo apt-get install git`
* Install Node.js: `sudo apt-get install nodejs`
* Install NPM: `sudo apt-get install npm`

NOTE: node.js will be using an old stable version.  If you need a later release, you will need to perform additional steps.

### Install Ansible on your remote server

From the Ansible Website, here is a list of commands for fetching the latest release of Ansible on Ubuntu:
* `$ sudo apt-get install software-properties-common`
* `$ sudo apt-add-repository ppa:ansible/ansible`
* `$ sudo apt-get update`
* `$ sudo apt-get install ansible`

Verify your installed Ansible version is the latest version (2.1.0.0):
* `ansible --version`

**NOTE:** Make sure you get the latest version of Ansible, as they have made significant improvements over previous versions (especially regarding Windows modules).

### Project Installation

* Create the project directory:  `mkdir /var/www`
* Change to this directory: `cd /var/www`
* Clone this repository: `git clone https://github.com/ssenkus/ansible-devops-tool.git`
* Change to repository directory: `cd ansible-devops-tool`
* Install project dependencies with NPM: `npm install`

**TODO** - verify on a fresh server


## Setup & Configuration

**TODO**

### Usage

**TODO**

