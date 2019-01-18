#!/bin/sh

setup_git() {
  git config --global user.email "rajasimon@icloud.com"
  git config --global user.name "Raja Simon"
}

commit_backend() {
  git checkout --orphan backend
  mv ./backend 
  git add . *.html
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin-pages https://${GH_TOKEN}@github.com/MVSE-outreach/resources.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-pages gh-pages 
}

# setup_git
# commit_website_files
# upload_files