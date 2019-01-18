#!/bin/sh

setup_git() {
  git config --global user.email "rajasimon@icloud.com"
  git config --global user.name "Raja Simon"
}

push_backend() {
  cd backend
  git init
  git remote add origin https://${GITHUB_TOKEN}@github.com/rajasimon/testcrm.git > /dev/null 2>&1
  git checkout -b backend
  git add --all
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git push --quiet --force --set-upstream origin backend
  cd ..
}

push_frontend() {
  cd frontend
  git init
  git remote add origin https://${GITHUB_TOKEN}@github.com/rajasimon/testcrm.git > /dev/null 2>&1
  git checkout -b frontend
  git add --all
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git push --quiet --set-upstream origin frontend
  cd ..
}

setup_git
push_backend
push_frontend