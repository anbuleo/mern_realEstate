# React 
## For the project setup create a vite

**By using command __npm create vite@latest client_side__   

**Then cd command to open the current  working folder to access and install the npm package**

__npm i__

**To install the tailwind css  with vite for styling **

__npm install -D tailwindcss postcss autoprefixer__

to initialize the config file

__npx tailwindcss init -p__

** After this two command there are two file are created**

=>postcss.config.js
=>tailwind.config.js in this folder copy from the site and paste the config code 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

**To apply the base classes of tailwind css**

In the index.css file paste this 

@tailwind base;
@tailwind components;
@tailwind utilities;


=>. Now tailwind setup is ready

=> Delete all the unwanted files


__npm run dev__


**gitcommand**
…or create a new repository on the command line
echo "# mern_realEstate" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin https://github.com/anbuleo/mern_realEstate.git
  git push -u origin main

  …or push an existing repository from the command line
git remote add origin https://github.com/anbuleo/mern_realEstate.git
  git branch -M main
  git push -u origin main


 
 git init => to inizilize the repostariy
 git add . => its to add all
 git commit -m "message" => to add a message for this commit
 git remote add origin https://github.com/anbuleo/mern_realEstate.git

 npm i react-router-dom

 to add routing concepts
 