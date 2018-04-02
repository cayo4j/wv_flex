LLL UI development environment
==============================

Development environment setup for frontend part of LLL applicaton.
Please read: 
- [git workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [jspm documentation](https://github.com/jspm/jspm-cli/wiki/Getting-Started)

Initial setup
=============

- [install nodejs - (https://nodejs.org/en/download/)

- install [grunt](http://gruntjs.com/getting-started) and [jspm](https://github.com/jspm/jspm-cli/blob/master/docs/getting-started.md)

- [configure SSH keys for git](https://help.github.com/articles/generating-ssh-keys/)

- bind generated key with your gitlab account (Profile Settings -> SSH Keys -> Add SSH Key)

- clone this repository

- run

> npm install

Serve project
=============

- run

> grunt serve

Karma tests
===========

- run

> grunt test:dev (or grunt test:ci for single run)