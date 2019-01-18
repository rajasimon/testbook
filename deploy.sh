#!/bin/sh

setup_git() {
  git config --global user.email "rajasimon@icloud.com"
  git config --global user.name "Raja Simon"
}

push_backend() {
  cd backend
  git init
  git remote add origin https://${GH_TOKEN}@github.com/rajasimon/testcrm.git > /dev/null 2>&1
  git add --all
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git push --quiet --force --set-upstream origin master
}

push_frontend() {
  cd frontend
  git init
  git remote add origin https://${GH_TOKEN}@github.com/rajasimon/testcrm.git > /dev/null 2>&1
  git add --all
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git push --quiet --set-upstream origin master
}

setup_git
push_backend
push_frontend