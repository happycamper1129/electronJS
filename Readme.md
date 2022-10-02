
# Electron React Js Alt+Tab Blocker

Windows version of the application is running Python Script to Stop
Usage of Alt + Tab and user can goto Full Screen and escape from
Full screen.

## How To Run app in developer mode

To Run it 
Type in your CMD `npm install` in the directory

After that to run the app run ``npm run dev`` give it some time it
will take some time to run the app


## To make build (Mac,Windows,Linux)

Run CMD ``npm run release`` once you run this command 


## Compiling/Converting Python script to exe

Python version used : 3.8.1  

First please install [pyinstaller](https://pyinstaller.org/en/stable/) ``pip install keyboard``  

Install Pyinstaller ``pip install PyInstaller``  

## To Create exe  
pyinstaller --onefile runner.py  

This command will generate the exe file where you should place it
under ``/public`` folder

