const path = require('path');
var child = require('child_process')
var kill = require('tree-kill');
const url = require('url');
var win = null;
const { app, BrowserWindow, Menu, MenuItem, globalShortcut,electron,ipcMain  } = require('electron')
const isDev = require('electron-is-dev');
var runner = null;




const is_mac = process.platform==='darwin'
if(is_mac) {
  app.dock.hide()                                     // - 1 - 
}

function createWindow() {
  // Create the browser window.
  win= new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop:true,
    setVisibleOnAllWorkspaces:true,
    // kiosk: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
      devTools:false
    },
  });


 
  // win.loadURL(isDev
  //   ? 'http://localhost:3000':url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  // - 2 -
  win.setAlwaysOnTop(true, "screen-saver")  
win.setVisibleOnAllWorkspaces(true) 
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
  function execute() {
    var exePath =process.platform === "win32"? path.resolve(__dirname, './runner.exe'):null;
    runner = child.execFile(exePath, function(error, stdout, stderr){
      
      if (error !== null) {
        runner.kill('SIGKILL');
          
      }
    });
 
};
if(process.platform === "win32"){
execute()
}



}


ipcMain.on("GOTOFULLSCREEN", (event, args) => {
      win.setKiosk(true);
  });
  
  
  ipcMain.on("OFFTHEFULLSCREEN", (event, args) => {
    win.setKiosk(false);
});




app.whenReady().then(() => {
  globalShortcut.register('Alt+Tab', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)







app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    
    child.exec(`taskkill -F -T -PID ${runner.pid}`);
    kill(runner.pid, 'SIGKILL',(err)=>{

      app.quit();
    });
   

  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



  